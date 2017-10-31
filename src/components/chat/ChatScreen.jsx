import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fire from '../../libraries/Fire'
import firebase from 'firebase'
import _ from 'lodash'
import uuid from 'uuid/v4'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'react-bootstrap-daterangepicker/css/daterangepicker.css'

class ChatScreen extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    attributes: PropTypes.array,
    room_id: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    messages: [],
    message: '',
    smartReply: false
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

  render() {
    const messages = this.state.messages
    return (
      <div className="box box-success direct-chat direct-chat-success">
        <div className="box-header with-border">
          <h3 className="box-title">Direct Chat</h3>
          <div className="box-tools pull-right">
            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
            </button>
            <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
          </div>
        </div>
        <div className="box-body">
          <div ref="message-box" className="direct-chat-messages">
            { messages ? messages.map((item, i) => {
              return (<div className="direct-chat-msg" ref={item.message._id} key={i}>
                <div className="direct-chat-info clearfix">
                  <span className="direct-chat-name pull-left">{item.message.sender.name}</span>
                  <span className="direct-chat-timestamp pull-right">{moment(item.message.createdAt).format('LLL')}</span>
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
              <DateRangePicker startDate={moment(new Date())} endDate={moment(new Date())} drops="up" opens="left" timePicker>
                <span className="input-group-addon">
                  <i className="fa fa-calendar-check-o"></i>
                </span>
              </DateRangePicker>
              <span className="input-group-btn">
                <button type="button" className="btn btn-default dropdown-toggle btn-flat" data-toggle="dropdown">Services
                  <span className="fa fa-caret-down"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a >Clean house</a></li>
                  <li><a >Wash for pet</a></li>
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
