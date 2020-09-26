export namespace Dice {
  export function rollD20() {
    return rolldX(20);
  }

  function rolldX(x: number) {
    return Math.floor(Math.random() * x + 1);
  }
}
