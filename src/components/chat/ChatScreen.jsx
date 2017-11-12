import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fire from '../../libraries/Fire'
import firebase from 'firebase'
import _ from 'lodash'
import uuid from 'uuid/v4'
import moment from 'moment'
import Modal from 'react-responsive-modal'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NotificationSystem from 'react-notification-system'
import './assets/calendar.css'


class ChatScreen extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    attributes: PropTypes.array,
    targetUserId: PropTypes.string.isRequired,
    targetUser: PropTypes.object.isRequired,
    room_id: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.handleSend = this.handleSend.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onNavigate = this.onNavigate.bind(this)
    this.handleSelecteEvent = this.handleSelecteEvent.bind(this)
    this.handleBooking = this.handleBooking.bind(this)
    this._addNotification = this._addNotification.bind(this)
  }

  state = {
    messages: [],
    services: [],
    events: [],
    currentWeek: 0,
    availableTimes: [],
    message: '',
    service_id: null,
    service_name: '',
    smartReply: false,
    open: false,
    confirm: false,
    start_at: null
  }

  _addNotification = (level, message) => {
    this.refs.notificationSystem.addNotification({
      message: message,
      level: level,
      autoDismiss: 6,
      position: 'br'
    })
  }

  onOpenModal = (type = 'open') => {
    this.setState({ [type]: true })
  }

  onCloseModal = (type = 'open') => {
    this.setState({ [type]: false })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.room_id !== this.props.room_id) {
      this.setState({ messages: [] }, async () => {
        let messagesRef = await Fire.database().ref('messages').orderByChild("room_id").equalTo(this.props.room_id).limitToLast(100);
        messagesRef.on('child_added', async (snapshot) => {
          let message = { message: snapshot.val(), key: snapshot.key };
          let messages = _.concat(this.state.messages, message)
          this.setState({ messages: messages });
        })
      });
    }
  }

  componentWillMount = async () => {
    let messagesRef = await Fire.database().ref('messages').orderByChild("room_id").equalTo(this.props.room_id).limitToLast(100);
    messagesRef.on('child_added', async (snapshot) => {
      let message = { message: snapshot.val(), key: snapshot.key };
      let messages = _.concat(this.state.messages, message)
      this.setState({ messages: messages});
    })
    await this.props.actions.getServices().then(res => {
      this.setState({ services: res.payload.data.data });
    })
  }

  componentDidUpdate = () => {
    if (this.refs['message-box'].lastElementChild) {
      this.refs['message-box'].lastElementChild.scrollIntoView({block: 'end'})
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onNavigate = async (date, view, event) => {
    console.log('#### onNavigate');
    if (event === 'TODAY') {
      await this.setState({ currentWeek: 0 })
      this.renderEvents(this.state.availableTimes.first)
    }
    if (event === 'NEXT') {
      const currentWeek = this.state.currentWeek + 1
      await this.setState({ currentWeek: currentWeek})
      this.renderEvents(this.state.availableTimes.next, event)
    }
    if (event === 'PREV') {
      const currentWeek = this.state.currentWeek - 1
      if (currentWeek > 0) {
        await this.setState({ currentWeek: currentWeek })
        this.renderEvents(this.state.availableTimes.next, event)
      } else {
        await this.setState({ currentWeek: currentWeek })
        this.renderEvents(this.state.availableTimes.first)
      }
    }
  }

  handleChooseService = async (id, name, e) => {
    this.setState({ events: [], currentWeek: 0, service_id: null })
    await this.props.actions.getTimeAvailable(id).then(async (res) => {
      await this.setState({ availableTimes: res.payload.data.data, service_id: id, service_name: name})
      this.renderEvents(this.state.availableTimes.first)
    })
    this.onOpenModal()
  }

  handleSelecteEvent = (event) => {
    this.setState({ confirm: true, start_at: moment(event.start).utc() })
  }

  handleSend = async (e) => {
    e.preventDefault();
    /* Send the message to Firebase */
    if (!this.state.message) {
      return
    }

    const message = {
      _id: uuid(),
      text: this.state.message,
      sender: { _id: this.props.auth.user.uid, name: this.props.auth.user.full_name},
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      sender_id: this.props.auth.user.uid,
      room_id: this.props.room_id,
      smart_reply: this.state.smartReply
    }
    await Fire.database().ref('messages').push(message)
    this.setState({ message: ''})
  }

  handleBooking = async (e) => {
    if (!this.state.service_id || !this.state.start_at) {
      return
    }

    this.props.actions.booking(this.props.targetUser.id, {
      service_id: this.state.service_id, 
      start_at: this.state.start_at, 
    }).then(res => {
      if (res.payload && res.payload.status === 201) {
        this.onCloseModal('confirm')
        this._addNotification('success', 'Booking successful!')
        
      } else {
        this.onCloseModal('confirm')        
        this._addNotification('error', res.error.response.data.message)
      }
    })

  }

  renderEvents = (serviceTimes, event = 'TODAY') => {

    if (serviceTimes.length === 0) {
      return
    }

    const currentTime = new Date()
    let currentHours = currentTime.getHours()
    const currentMins = currentTime.getMinutes()

    if (currentMins > 1) {
      currentHours += 1
    }

    const dayOfWeek = moment().utc().isoWeekday()
    const prepareTime = currentHours + 4
    let results = []
    if (event === 'TODAY') {
      for (let i = 0; i < serviceTimes.length; i++) {
        const day = serviceTimes[i].day_of_week - dayOfWeek
        const event = {
          'title': 'Can booking',
          'allDay': false
        }
        const time = moment().utc()
        time.set('hour', serviceTimes[i].time)
        time.set('minute', 0)
        time.set('second', 0)
        if (day === 0 && serviceTimes[i].time < prepareTime) {
          continue
        } else if (day === 0) {
          event.start = time.toDate()
          event.end = time.toDate()
        } else if (day > 0) {
          time.add(day, 'd')
          event.start = time.toDate()
          event.end = time.toDate()
        } else {
          time.add(day + 7, 'd')
          event.start = time.toDate()
          event.end = time.toDate()
        }
        results = results.concat(event)
      }
    } else {
      let week = this.state.currentWeek
      for (let i = 0; i < serviceTimes.length; i++) {
        const day = serviceTimes[i].day_of_week - dayOfWeek
        const event = {
          'title': 'Can booking',
          'allDay': false
        }
        const time = moment().utc()
        time.set('hour', serviceTimes[i].time)
        time.set('minute', 0)
        time.set('second', 0)
        if (day === 0) {
          time.add(7 * week, 'd')
          event.start = time.toDate()
          event.end = time.toDate()
        } else {
          time.add(day + 7 * week, 'd')
          event.start = time.toDate()
          event.end = time.toDate()
        }
        results = results.concat(event)
      }
    }
    this.setState({ events: results })
  }

  render() {
    moment.updateLocale('en-gb', {
      week: {
        dow: 1, // Saturday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
      }
    });

    moment.locale('en-gb');

    BigCalendar.momentLocalizer(moment);

    const { open } = this.state
    const { confirm } = this.state
    return (
      <div className="box box-success direct-chat direct-chat-success">
        <Modal open={open} onClose={this.onCloseModal.bind(this)} closeIconSize={19} closeOnOverlayClick={false} little>
          <NotificationSystem ref="notificationSystem" />          
          <h2>Service {this.state.service_name}</h2>
          <BigCalendar
            {...this.props}
            events={this.state.events}
            allDayAccessor="false"
            views={{
              week: true
            }}
            children={
              <Modal open={confirm} onClose={this.onCloseModal.bind(this, 'confirm')} closeIconSize={19} closeOnOverlayClick={false} little>
                <div className="" id="modal-warning">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Confirmation</h4>
                      </div>
                      <div className="modal-body">
                        <p>Do you want create a booking for this service on {this.state.start_at ? this.state.start_at.toString() : ''}?</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" data-dismiss="modal" onClick={this.onCloseModal.bind(this, 'confirm')}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleBooking}>Book</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            }
            selectable
            step={90}
            onNavigate={this.onNavigate}
            defaultView='week'
            onSelectEvent={this.handleSelecteEvent}
          />
        </Modal>
        <div className="box-header with-border">
          <h3 className="box-title">Direct Chat With {this.props.targetUser.full_name}</h3>
          <div className="box-tools pull-right">
            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
            </button>
            <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
          </div>
        </div>
        <div className="box-body">
          <div ref="message-box" className="direct-chat-messages">
            {this.state.messages ? this.state.messages.map((item, i) => {
              const blockTarget = item.message.sender_id !== this.props.auth.user.uid ? 'right' : ''
              const classTargetName = item.message.sender_id !== this.props.auth.user.uid ? 'pull-right' : 'pull-left'
              const classTargetCreated = item.message.sender_id !== this.props.auth.user.uid ? 'pull-left' : 'pull-right'
              const addon = item.message.sender_id !== this.props.auth.user.uid ? `${this.props.targetUser.address ? (" - " + this.props.targetUser.address) : ''} ${this.props.targetUser.phone ? " - " + this.props.targetUser.phone : ''}` : ''
              return (<div className={`direct-chat-msg ${blockTarget}`} ref={item.message._id} key={i}>
                <div className="direct-chat-info clearfix">
                  <div className={`direct-chat-name ${classTargetName}`}><p>{item.message.sender.name} {addon}</p></div>
                  <div className={`direct-chat-timestamp ${classTargetCreated}`}>{moment(item.message.createdAt).format('LLL')}</div>
                </div>
                <div className="direct-chat-text">
                  {item.message.text}
                </div>
              </div>)
            })
            : null }
          </div>
        </div>
        <div className="box-footer">
          <form onSubmit={this.handleSend}>
            <div className="input-group">
              <input type="text" name="message" onChange={this.handleChange} placeholder="Type Message ..." className="form-control" value={this.state.message}/>
              <span className="input-group-btn">
                <button type="button" className="btn btn-default dropdown-toggle btn-flat" data-toggle="dropdown">Services
                  <span className="fa fa-caret-down"></span>
                </button>
                <ul className="dropdown-menu">
                {
                  this.state.services && this.state.services.map((service, i) => <li key={i} onClick={this.handleChooseService.bind(this, service.id, service.name)}><a>{service.name}</a></li>)
                }
                </ul>
              </span>
              <span className="input-group-btn">
                <button type="submit" className="btn btn-success btn-flat">Send</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  };
};

export default ChatScreen;
