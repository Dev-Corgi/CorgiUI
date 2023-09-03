class SlideDetectorComponent{
  constructor(delay) {
    this.touchStartRef = null;
    this.eventTarget = new EventTarget();
    this.slideevent = new CustomEvent('slideevent', {
      detail :{
        state: 0
      },
    });

    this.condition = true;
    this.delay = delay;
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.component = component;
    this.eventname = 'slideevent';

    this.component.addEventListener('touchstart', this.handleTouchStart);
    this.component.addEventListener("mousedown", this.handleTouchStart);
    this.component.addEventListener('touchend',this.handleTouchEnd);
    this.component.addEventListener("mouseup", this.handleTouchEnd);
  }

  handleTouchStart(event) {
    if(event.touches != null){
    this.touchStartRef = event.touches[0].clientX;
    }
    else{
      this.touchStartRef = event.clientX;
    }
  }

  handleTouchEnd(event) {
    if (this.condition) {
    let touchEnd = 0
    if(event.changedTouches != null){
      touchEnd = event.changedTouches[0].clientX;
      }
      else{
        touchEnd = event.clientX;
      }

    const touchStart = this.touchStartRef;
    const slideDistance = touchEnd - touchStart;


    if(slideDistance > 20){
        //right
        this.slideevent.detail.state = -1;
    }

    else if (slideDistance < -20) {
        //left
      this.slideevent.detail.state = 1;
    }

    else{
      this.slideevent.detail.state = 0;
    }


    this.eventTarget.dispatchEvent(this.slideevent);
    setTimeout(() => { this.condition = true }, this.delay);
}
  }

  destroy() {
    this.component.removeEventListener('touchstart', this.handleTouchStart);
    this.component.removeEventListener('touchend', this.handleTouchEnd);
    this.component.removeEventListener('mousedown', this.handleTouchStart);
    this.component.removeEventListener('mouseup', this.handleTouchEnd);
  }

}

export default SlideDetectorComponent;
