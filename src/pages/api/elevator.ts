import type { NextApiRequest, NextApiResponse } from "next";

class Elevator {
  maxFloors: number;
  maxWeight: number;
  current: number;
  averagePassengerWeight: number;

  constructor(
    maxFloors: number,
    maxWeight: number,
    averagePassengerWeight: number
  ) {
    this.maxFloors = maxFloors;
    this.maxWeight = maxWeight;
    this.current = 0;
    this.averagePassengerWeight = averagePassengerWeight;
  }

  setFloor(floor: number, passengers: number) {
    const maxPassengers = this.canFitPassengers();
    if (
      floor >= 0 &&
      floor <= this.maxFloors &&
      passengers >= 0 &&
      passengers <= maxPassengers
    ) {
      this.current = floor;
    } else throw Error();
  }

  canFitPassengers(): number {
    return this.maxWeight / this.averagePassengerWeight;
  }
}

const elevator = new Elevator(200, 400, 50);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);

  try {
    elevator.setFloor(data.floor, data.passengers);
    res.status(200).json({ elevator });
  } catch (e) {
    return res.status(400).json({
      error: "Bad numbers, retry with new floor or amount of passengers",
    });
  }
}
