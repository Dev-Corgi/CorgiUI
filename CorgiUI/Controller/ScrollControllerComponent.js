export default class ScrollControllerComponent {
  constructor(delay) {
    this.ref = null
    this.eventTarget = new EventTarget();
    this.event = new CustomEvent('scrollevent', {
      detail :{
        state: 0
      }
    });
    this.condition = true;
    this.delay = delay;
    this.linkRef = this.linkRef.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.eventname = 'scrollevent';
  }

  linkRef(ref){
    this.ref = ref
    this.ref.current.addEventListener('wheel', this.handleScroll);
  }

  handleScroll(event) {
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