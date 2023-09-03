export default class OpacityMotion  {
    constructor(deltaOpacity,delay,duration,easetype) {
      this.deltaOpacity = deltaOpacity
      this.motion = {
      opacity: null,
      transition: {
        duration: duration,
        delay: delay,
        ease:easetype
      }
    };
    }

    linkRef(ref){
      this.ref = ref
    }

    handleMotion() {

      this.motion = {
        opacity: parseFloat(window.getComputedStyle(this.ref.current).opacity) + this.deltaOpacity,
        transition: {
        duration: this.duration,
        delay: this.delay,
        ease:this.easetype
      },
    }
      return this.motion

    }

  }

