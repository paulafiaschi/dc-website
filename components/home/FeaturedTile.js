import Link from "next/link";
import Image from "next/image";
import FlightScore from "../product-tile/FlightScore";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/Home.module.scss";

import placeholder from "../../public/images/image4.jpg";

export default function FeaturedTile({ product }) {
  let productImages = [];
  product.img.includes(",")
    ? (productImages = product.img.split(","))
    : (productImages = productImages.concat(product.img));
  return (
    <Link href={`/product/${product._id}`}>
      <div className={styles.productTile}>
        <Image
          src={productImages[0]}
          alt={product.name}
          width={200}
          height={200}
          layout="responsive"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />

        {product.speed !== 0 ? (
          <div className={styles.flightScore}>
            <FlightScore kind="Speed" score={product.speed} />
            <FlightScore kind="Glide" score={product.glide} />
            <FlightScore kind="Turn" score={product.turn} />
            <FlightScore kind="Fade" score={product.fade} />
          </div>
        ) : null}

        <p>{product.brand}</p>
        <h3>{product.name}</h3>
        <p className={styles.price}>
          <span>{product.price}</span> dkk
        </p>
      </div>
    </Link>
  );
}
