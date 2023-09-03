export default class GuageController {
  constructor(inputController, minValue = -Infinity , maxValue = Infinity) {
    this.eventTarget = new EventTarget();
    this.event = new CustomEvent('guageevent', {
      detail : {
        state : 0,
        value : 0
      }
    });
    this.maxvalue = maxValue;
    this.minValue = minValue
    this.handleGuage = this.handleGuage.bind(this);
    this.inputController = inputController
    this.inputController.eventTarget.addEventListener(this.inputController.eventname, this.handleGuage);
    this.eventname = 'guageevent';
    this.output = 0
  }

  handleGuage(event) {
      //아래
      if (event.detail.state > 0) {
        if (this.event.detail.value < this.maxvalue) {
          this.event.detail.state = 1;
          this.event.detail.value++;
        }
      }

      //위
      else {
        if (this.event.detail.value > this.minValue) {
          this.event.detail.state = -1;
          this.event.detail.value--;
        }
      }
      this.output = this.event.detail.value
      this.eventTarget.dispatchEvent(this.event);
  }

  destroy() {
    this.inputController.eventTarget.removeEventListener(
      this.inputController.eventTarget.type,
      this.handleGuage
    );
  }
}
