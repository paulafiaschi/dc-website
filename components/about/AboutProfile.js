import Image from "next/image";
import styles from "../../styles/About.module.scss";
export default function AboutProfile({ ...props }) {
  console.log(props.name);
  return (
    <div
      style={props.name === "soeren" ? { flexDirection: "row" } : { flexDirection: "row-reverse" }}
      className={styles.profile}
    >
      <div>
        <Image src={props.image} alt="black haired person" object-fit="fill" />
      </div>
      <p>{props.text}</p>
    </div>
  );
}