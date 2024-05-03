import {Component} from 'react'

import './index.css'

const startImg = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseImg = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const resetImg = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

let timeId
class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 60, isStart: true, secondsStop: true}

  startTimeandPause = () => {
    const {isStart} = this.state
    if (isStart) {
      timeId = setInterval(this.tick, 1000)
    } else {
      clearInterval(timeId)
      this.setState({isStart: true, secondsStop: false})
    }
  }

  tick = () => {
    const {seconds, minutes} = this.state
    let updatedSeconds = seconds
    let updatedMinutes = minutes
    if (seconds === 0) {
      updatedSeconds = 60
      updatedMinutes -= 1
    }
    this.setState({
      seconds: updatedSeconds - 1,
      minutes: updatedMinutes,
      isStart: false,
      secondsStop: false,
    })
  }

  decreaseMinutes = () => {
    this.setState(prevState => ({minutes: prevState.minutes - 1}))
  }

  increaseMinutes = () => {
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  resetMinutes = () => {
    clearTimeout(timeId)
    this.setState(prevState => ({
      minutes: prevState.minutes,
      isStart: true,
      secondsStop: true,
      seconds: 60,
    }))
  }

  render() {
    const {minutes, seconds, isStart, secondsStop} = this.state

    const startOrpauseImg = isStart ? startImg : pauseImg

    return (
      <div className="bg-container">
        <div className="inner-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-container">
            <div className="clock-container">
              <div className="clock-inner-container">
                <h1 className="clock-updated-text">{`${minutes}:${
                  secondsStop
                    ? '00'
                    : seconds < 10
                    ? `0${seconds}`
                    : `${seconds}`
                }`}</h1>
                <p className="clock-update-running">
                  {isStart ? 'Paused' : 'Running'}
                </p>
              </div>
            </div>
            <div className="time-set-and-start-pause-container">
              <div className="start-reset-container">
                <div className="start-pause-container">
                  <button className="button-start" type="button">
                    <img
                      className="start-pause-icon"
                      src={startOrpauseImg}
                      alt={isStart ? 'play icon' : 'pause icon'}
                      onClick={this.startTimeandPause}
                    />
                  </button>
                  <p className="start-pause-text">
                    {isStart ? 'Start' : 'Pause'}
                  </p>
                </div>
                <div className="reset-container">
                  <button
                    className="button-start"
                    type="button"
                    onClick={this.resetMinutes}
                  >
                    <img
                      className="reset-icon"
                      src={resetImg}
                      alt="reset icon"
                    />
                  </button>
                  <p className="reset-text">Reset</p>
                </div>
              </div>
              <div className="time-setting-container">
                <p className="set-time-text">Set Timer limit</p>
                <div className="pluse-minus-button-container">
                  <button
                    className="button"
                    type="button"
                    onClick={this.decreaseMinutes}
                    disabled={!isStart}
                  >
                    -
                  </button>
                  <div className="time-limit-container">
                    <p className="time-setting-text">{minutes}</p>
                  </div>
                  <button
                    className="button"
                    type="button"
                    onClick={this.increaseMinutes}
                    disabled={!isStart}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
