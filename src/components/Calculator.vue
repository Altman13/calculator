<template>
  <div class="calculator col-lg-3">
    <table cellspacing="10">
      <tr>
        <td colspan="4">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          <input type="text" v-model="result" disabled />
        </td>
      </tr>
      <tr>
        <td class="button grey" @click="clear">C</td>
        <td class="button grey" @click="invert">+/-</td>
        <td class="button grey" @click="percent">%</td>
        <td class="button orange" @click="setOperator('/')">/</td>
      </tr>
      <tr>
        <td class="button grey" @click="addNumber(7)">7</td>
        <td class="button grey" @click="addNumber(8)">8</td>
        <td class="button grey" @click="addNumber(9)">9</td>
        <td class="button orange" @click="setOperator('*')">*</td>
      </tr>
      <tr>
        <td class="button grey" @click="addNumber(4)">4</td>
        <td class="button grey" @click="addNumber(5)">5</td>
        <td class="button grey" @click="addNumber(6)">6</td>
        <td class="button orange" @click="setOperator('-')">-</td>
      </tr>
      <tr>
        <td class="button grey" @click="addNumber(1)">1</td>
        <td class="button grey" @click="addNumber(2)">2</td>
        <td class="button grey" @click="addNumber(3)">3</td>
        <td class="button orange" @click="setOperator('+')">+</td>
      </tr>
      <tr>
        <td class="button-col2 grey" @click="addNumber(0)" colspan="2">0</td>
        <td class="button grey" @click="addPoint">.</td>
        <td class="button orange" @click="equal">=</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { db } from "../main";
export default {
  data: function() {
    return {
      result: 0,
      tmp_value: 0,
      reset: false,
      operator: undefined,
      calc_result: [],
      timestamp: "",
      
    };
  },
  methods: {
    ...mapActions(["HistoryAdd"]),
    clear() {
      this.result = 0;
      this.tmp_value = 0;
      this.operator = undefined;
    },
    invert() {
      this.result *= -1;
    },
    percent() {
      this.result /= 100;
    },
    addNumber(number) {
      if (this.result == 0 || this.reset === true) {
        this.result = "";
        this.reset = false;
      }

      this.result += number.toString();
    },
    addPoint() {
      if (!this.result.includes(".")) this.result += ".";
    },
    setOperator(operator) {
      if (this.tmp_value != 0) this.calculate();

      this.tmp_value = this.result;
      this.operator = operator;
      this.reset = true;
    },
    equal() {
      this.calc_result.pop()
      this.getNow();
      this.calculate();
      this.tmp_value = 0;
      this.operator = undefined;
      this.HistoryAdd(this.calc_result)
      this.addCalcHistroy(this.calc_result)

    },
    calculate() {
      let value = 0;
      let firstNum = parseFloat(this.tmp_value);
      let secondNum = parseFloat(this.result);

      switch (this.operator) {
        case "+":
          value = firstNum + secondNum;
          break;
        case "-":
          value = firstNum - secondNum;
          break;
        case "*":
          value = firstNum * secondNum;
          break;
        case "/":
          value = firstNum / secondNum;
      }
      this.result = value.toString();

      this.calc_result.push(
        this.timestamp +' '+
          firstNum +
          this.operator +
          secondNum +
          "=" +
          this.result
      )
      
    },
    addCalcHistroy(hist) {
      db.collection("history").add({ hist });
    },
    getNow() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    }
  }
};
</script>

<style lang="scss" scoped>
span:nth-child(1)
{
  background-color: red;
  margin-top: 5px;
  margin-left: -160px;
}
span:nth-child(2)
{
  background-color: green;
  margin-top: 5px;
  margin-left: -100px;
}
span:nth-child(3)
{
  margin-top: 5px;
  background-color: yellow;
  margin-left: -130px;
}
.dot {
  height: 25px;
  width: 25px;
  position: absolute;
  border-radius: 50%;
  display: inline-block;
}
.calculator {
  font-size: 3rem;
  border: solid 2px black;

  table {
    color: #fff;
    width: 370px;
  }

  input {
    display: block;
    width: 100%;
    height: 125px;
    padding: 5px 20px 0;
    border: 2px solid black;
    border: none;
    background-color: #222;
    color: #fff;
    font-size: 4rem;
    text-align: right;
  }
  .button {
    margin: 10px;
    width: 80px;
    height: 80px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    border: 2px solid black;
  }

  .button-col2 {
    width: 160px;
    height: 80px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    border: 2px solid black;
  }

  .grey {
    background-color: #ccc;
    color: #333;

    &:hover {
      background-color: #ddd;
    }
  }

  .dark {
    background-color: #444;
    color: #fff;

    &:hover {
      background-color: #555;
    }
  }

  .orange {
    background-color: #e08d1f;
    color: #fff;

    &:hover {
      background-color: #fda22b;
    }
  }
}
</style>


