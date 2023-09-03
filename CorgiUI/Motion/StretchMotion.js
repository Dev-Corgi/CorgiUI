export default class StretchMotion {
  constructor(deltaW, deltaH, unit, delay, duration, easetype) {
    this.deltaW = deltaW;
    this.deltaH = deltaH;
    this.motion = {
      width: `${deltaW}${unit}`,
      height: `${deltaH}${unit}`,

      transition: {
        duration: duration,
        delay: delay,
        ease: easetype,
      },
    };
  }

  linkRef(ref) {
    this.ref = ref;
  }

  handleMotion() {

    this.motion = {
      width: this.ref.current.offsetWidth + this.deltaW,
      height: this.ref.current.offsetHeight + this.deltaH,

      transition: {
        duration: this.duration,
        delay: this.delay,
        ease: this.easetype,
      },
    };
    return this.motion;
  }
}
