import React from "react";
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
import { Field, FieldRenderProps, Form } from "react-final-form";
import { type } from "os";

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

interface FormValues {
  name: string;
  phone: string;
  pizza: string;
}

const initialValues: FormValues = {
  name: "jack",
  phone: "555-555-1111",
  pizza: "Hawai",
};
const required = (value: string) => (value ? undefined : "Required");
const validPhone = (value: string) =>
  /^\d\d\d-\d\d\d-\d\d\d\d$/.test(value) ? undefined : "Invalid phone number";

const RadioFormField: React.FC<FieldRenderProps<string, any>> = ({
  input: { checked, value, name, onChange, ...otherInput },
  meta,
  ...other
}) => (
  <Radio
    {...other}
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    inputProps={otherInput}
  />
);
const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4">
        Your best pies are always at Fry's pizza
      </Typography>
      <Form
        onSubmit={() => {}}
        initialValues={initialValues}
        render={({ handleSubmit, valid, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <TextField
                  label="Your phone number"
                  error={meta.error}
                  fullWidth
                  variant="outlined"
                  className={classes.textField}
                  {...input}
                />
              )}
            </Field>
            <Field name="phone" validate={validPhone}>
              {({ input, meta }) => (
                <TextField
                  label="Your name"
                  error={meta.error}
                  fullWidth
                  variant="outlined"
                  className={classes.textField}
                  {...input}
                />
              )}
            </Field>
            <Grid container className={classes.textField}>
              <Grid item xs={3}>
                <RadioGroup
                  aria-label="Pizza type"
                  name="pizza"
                  value={values.pizza}
                >
                  {pizzaTypes.map((pizza) => (
                    <FormControlLabel
                      value={pizza.name}
                      control={
                        <Field
                          type="radio"
                          name="pizza"
                          value={pizza.name}
                          component={RadioFormField}
                        />
                      }
                      label={pizza.name}
                      key={pizza.name}
                    ></FormControlLabel>
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={9}>
                <img
                  src={`/pizzas/${
                    pizzaTypes.find(({ name }) => name === values.pizza)?.image
                  }`}
                  className={classes.pizzaImage}
                  alt={`${values.pizza} pizza`}
                ></img>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" disabled={!valid}>
              Where's the pizzzzzaaaahhh!
            </Button>
          </form>
        )}
      ></Form>
    </Container>
  );
};

export default App;
