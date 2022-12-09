import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`pk_test_51MD1P6GDi8cV7qeJUxV5FS7aY4ul2TSyR4mbg18SlMMLCqVqhl8maJvDMHqak35lbNg1cN9uuTdSH59dGPadcLee00FFRG2CNO`);
  }
  return stripePromise;
};

export default getStripe;
