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
import { Form, Formik, FormikErrors, FormikProps, withFormik } from "formik";

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

// Shape of form values
interface FormValues {
  name: string;
  phone: string;
  pizza: string;
}
interface OtherProps {
  classes: any;
}

const initialValues: FormValues = {
  name: "jack",
  phone: "555-555-1111",
  pizza: "Hawai",
};

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    classes,
  } = props;
  return (
    <form>
      <TextField
        label="Your name"
        value={values.name}
        error={touched.name && errors.name ? true : false}
        type="name"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        variant="outlined"
        className={classes.textField}
      />
      <TextField
        label="Your phone number"
        value={values.phone}
        error={touched.phone && errors.phone ? true : false}
        type="phone"
        name="phone"
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        variant="outlined"
        className={classes.textField}
      />
      <Grid container className={classes.textField}>
        <Grid item xs={3}>
          <RadioGroup
            aria-label="Pizza type"
            name="pizza"
            value={values.pizza}
            onChange={(e: React.ChangeEvent<any>) =>
              setFieldValue(
                "pizza",
                pizzaTypes.find(({ name }) => name === e.target.value)?.name
              )
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
            src={`/pizzas/${
              pizzaTypes.find(({ name }) => name === values.pizza)?.image
            }`}
            className={classes.pizzaImage}
            alt={`${values.pizza} pizza`}
          ></img>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        disabled={errors.name || errors.phone ? true : false}
      >
        Where's the pizzzzzaaaahhh!
      </Button>
    </form>
  );
};
interface MyFormProps {
  classes: any;
  initialValues: FormValues;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return props.initialValues;
  },
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (values.name.trim().length <= 0) {
      errors.name = "Required";
    }
    const regex = /^\d\d\d-\d\d\d-\d\d\d\d$/;
    if (!regex.test(values.phone)) {
      errors.phone = "Valid phone number required";
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

const App: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <Container>
        <CssBaseline />
        <Typography variant="h4">
          Your best pies are always at Fry's pizza.
        </Typography>
        <MyForm classes={classes} initialValues={initialValues} />
      </Container>
    </div>
  );
};

export default App;
