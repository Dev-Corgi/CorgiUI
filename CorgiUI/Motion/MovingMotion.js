export default class MovingMotion  {
    constructor(deltaX, deltaY,delay,duration,easetype) {
      this.ref = null
      this.deltaX =  deltaX == 0 ? "0px" : deltaX 
      this.deltaY =  deltaY == 0 ? "0px" : deltaY
      this.delay = delay
      this.duration = duration
      this.easetype = easetype
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;

      this.motion = {
        x:0,y:0,
        transition: {
          duration: this.duration,
          delay: this.delay,
          ease:this.easetype
        },
    };
    }

    linkRef(ref){
      this.ref = ref
    }

    calcDelta(delta,origin){

      const pattern = /(-?\d+(\.\d+)?)\D+/;
      const matches = delta.match(pattern);

      const value = parseFloat(matches[1]); // 숫자 부분 추출
      const unit = delta.substring(matches[1].length); // 문자 부분 추출

      switch (unit) {

        case "vw":
          delta = (origin / this.windowWidth) * 100 + value +"vw"
          break;

          case "vh":
            delta = (origin / this.windowHeight) * 100 + value +"vh"
            break;

            default :
            delta = origin +value +"px"
            break;
      }

      return delta

    }
  
    handleMotion() {

      const Matrix = new DOMMatrix(window.getComputedStyle(this.ref.current).transform)

      this.motion = {
        x: this.calcDelta(this.deltaX,Matrix.e),
        y: this.calcDelta(this.deltaY,Matrix.f),
        transition: {
        duration: this.duration,
        delay: this.delay,
        ease:this.easetype
      },
    }
      return this.motion
    }

  }