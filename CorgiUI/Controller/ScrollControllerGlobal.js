
export default class ScrollControllerGlobal {
  constructor(delay) {
    this.eventTarget = new EventTarget();
    this.event = new CustomEvent('scrollevent', {
      detail :{
        state: 0
      }
    });
    this.condition = true;
    this.delay = delay;
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('wheel', this.handleScroll);
    this.eventname = 'scrollevent';
  }


  handleScroll(event) {
    console.log("scroll")
    if (this.condition) {
      this.condition = false;

      //아래
      if (event.deltaY > 0) {
        this.event.detail.state = 1;
      }
      //위
      else {
        this.event.detail.state = -1;
      } 
      this.eventTarget.dispatchEvent(this.event);
      setTimeout(() => { this.condition = true }, this.delay);
    }
  }

  destroy() {
    window.removeEventListener('wheel', this.handleScroll);
  }
}