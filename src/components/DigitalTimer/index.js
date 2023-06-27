import {Component} from 'react'
import './index.css'

const initialState = {
  timerLimitInMinutes: 25,
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0
    return (
      <div>
        <p className="set-timer-text"> Set Timer Limit</p>
        <div className="increase-decrease-container">
          <button
            type="button"
            onClick={this.onDecreaseTimerLimitInMinutes}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <p className="text-count">{timerLimitInMinutes}</p>
          <button
            type="button"
            onClick={this.onIncreaseTimerLimitInMinutes}
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const playOrStartImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playOrPauseAlt = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="buttons-container">
        <button type="button" onClick={this.onStartOrPauseTimer}>
          <img
            src={playOrStartImageUrl}
            alt={playOrPauseAlt}
            className="icon-image"
          />
          <p className="buttons-text">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button type="button" onClick={this.onResetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
            alt="reset icon"
            className="icon-image"
          />
          <p className="buttons-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <>
        <div className="app-container">
          <h1>Digital Timer</h1>
          <div className="timer-container">
            <div className="background-image-container">
              <div className="timer-status-container">
                <h1 className="running-timer">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p>{labelText}</p>
              </div>
            </div>
            <div className="time-change-container">
              {this.renderTimerController()}
              {this.renderTimerLimitController()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default DigitalTimer
