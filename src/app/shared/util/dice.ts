export namespace Dice {
  export function rollD100() {
    return rolldX(100);
  }

  export function rollD20() {
    return rolldX(20);
  }

  export function rollD12() {
    return rolldX(12);
  }

  export function rollD10() {
    return rolldX(10);
  }

  export function rollD8() {
    return rolldX(8);
  }

  export function rollD6() {
    return rolldX(6);
  }

  export function rollD4() {
    return rolldX(6);
  }

  function rolldX(x: number) {
    return Math.floor(Math.random() * x + 1);
  }
}
