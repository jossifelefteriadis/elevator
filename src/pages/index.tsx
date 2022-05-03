import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useCallback, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState({
    floor: 0,
    passengers: 0,
    endFloor: 0,
    msg: "",
  });

  const goToFloor = useCallback(
    (e: FormEvent<HTMLElement>) => {
      e.preventDefault();

      fetch("/api/elevator", {
        body: JSON.stringify({
          floor: data.floor,
          passengers: data.passengers,
        }),
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => showRes(data));
    },
    [data]
  );

  const showRes = (data) => {
    if (data.elevator) {
      setData({
        ...data,
        msg: String(`Current floor: ${data.elevator.current}`),
      });
      data.endFloor;
    } else {
      setData({
        ...data,
        msg: String(`Error: ${data.error}`),
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Elevator System</title>
        <meta name="description" content="Elevator System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <b>Elevator</b>
        </h1>
        <p>
          In this building we have 200 floors. The elevator has a max capacity
          of 400kg, each passenger weights 50kg.
        </p>
        <p>Chose which floor you want to go to, and how many passengers.</p>
        <section>
          <form onSubmit={goToFloor}>
            Go to floor:
            <input
              type="number"
              id="floor"
              value={data.floor}
              onChange={(e) =>
                setData({ ...data, floor: Number(e.target.value) })
              }
            />
            Passengers:
            <input
              type="number"
              id="passenger"
              value={data.passengers}
              onChange={(e) =>
                setData({ ...data, passengers: Number(e.target.value) })
              }
            />
            <button type="submit">GO</button>
          </form>
        </section>
        <br />
        <section>{data.msg}</section>
      </main>
    </div>
  );
};

export default Home;
