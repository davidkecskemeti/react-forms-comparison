import React, { useReducer } from "react";
import "./App.css";
import {
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";

interface Pizza {
  name: string;
  image: string;
}

const pizzaTypes: Pizza[] = [
  {
    name: "Hawai",
    image: "hawai.jpg",
  },
  {
    name: "Salami",
    image: "salami.jpg",
  },
  {
    name: "Ham",
    image: "ham.jpg",
  },
  {
    name: "Margarita",
    image: "margarita.jpg",
  },
];
const useStyles = makeStyles({
  textField: {
    marginTop: "1em",
  },
  pizzaImage: {
    width: "100%",
  },
});

const validate = (state: State): State => {
  const validName = state.name.trim().length > 0;
  const validPhone = /^\d\d\d-\d\d\d-\d\d\d\d$/.test(state.phone);
  return {
    ...state,
    validName,
    validPhone,
    valid: validName && validPhone,
  };
};
enum ActionType {
  setName,
  setPhoneNumber,
  setPizza,
}
interface State {
  name: string;
  phone: string;
  validName: boolean;
  validPhone: boolean;
  pizza: Pizza | undefined;
  valid: boolean;
}

export interface Action {
  type: ActionType;
  payload: any;
}
interface NameAction extends Action {
  type: ActionType.setName;
  payload: { name: string };
}

interface PhoneAction extends Action {
  type: ActionType.setPhoneNumber;
  payload: { phone: string };
}

const App = () => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      console.log("dispatched:" + state.name + "," + action.payload.name);

      switch (action.type) {
        case ActionType.setName:
          return validate({
            ...state,
            ...action.payload,
          });
        case ActionType.setPhoneNumber:
          return validate({
            ...state,
            ...action.payload,
          });
        case ActionType.setPizza:
          return validate({
            ...state,
            ...action.payload,
          });
        default:
          return state;
      }
    },
    validate({
      name: "Jack",
      validName: true,

      phone: "555-555-1111",
      validPhone: true,

      pizza: pizzaTypes.find(({ name }) => name === "Hawai"),

      valid: true,
    })
  );

  const classes = useStyles();

  return (
    <div className="App">
      <Container>
        <CssBaseline>
          <Typography variant="h4">
            Your best pies are always at Fry's pizza.
          </Typography>
          <TextField
            label="Your name"
            value={state.name}
            error={!state.validName}
            onChange={(e: React.ChangeEvent<any>) =>
              dispatch({
                type: ActionType.setName,
                payload: { name: e.target.value },
              })
            }
            fullWidth
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            label="Your phone number"
            value={state.phone}
            error={!state.validPhone}
            onChange={(e: React.ChangeEvent<any>) =>
              dispatch({
                type: ActionType.setPhoneNumber,
                payload: { phone: e.target.value },
              })
            }
            fullWidth
            variant="outlined"
            className={classes.textField}
          />
        </CssBaseline>
        <Grid container className={classes.textField}>
          <Grid item xs={3}>
            <RadioGroup
              aria-label="Pizza type"
              name="pizza"
              value={state.pizza?.name}
              onChange={(e: React.ChangeEvent<any>) =>
                dispatch({
                  type: ActionType.setPizza,
                  payload: {
                    pizza: pizzaTypes.find(
                      ({ name }) => name === e.target.value
                    ),
                  },
                })
              }
            >
              {pizzaTypes.map((pizza) => (
                <FormControlLabel
                  value={pizza.name}
                  control={<Radio />}
                  label={pizza.name}
                  key={pizza.name}
                ></FormControlLabel>
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={9}>
            <img
              src={`/pizzas/${state.pizza?.image}`}
              className={classes.pizzaImage}
              alt={`${state.pizza?.name} pizza`}
            ></img>
          </Grid>
        </Grid>
        <Button variant="contained" disabled={!state.valid}>
          Where's the pizzzzzaaaahhh!
        </Button>
        <div>{JSON.stringify(state)}</div>
      </Container>
    </div>
  );
};

export default App;
