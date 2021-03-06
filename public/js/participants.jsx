var React = require('react');
var _ = require('underscore');
module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.props.socket.on('newConnection', this.newConnection);
    this.props.socket.on('userDisconnected', this.userDisconnected);
    this.props.socket.on('nameChanged', this.nameChanged);
  },
  newConnection: function(data) {
    this.setState({data:data});
  },
  userDisconnected: function(data) {
    var currentUsers = this.state.data;
    currentUsers.participants = _.without(currentUsers.participants,
      _.findWhere(currentUsers.participants, {id: data.id}));
    this.setState({data:currentUsers});
  },
  nameChanged: function(event) {
    var allUsers = this.state.data;
    _.findWhere(allUsers.participants,
      {id: event.id}).name = event.name;
    this.setState({data:allUsers});
  },
  render:function(){
    if(this.state.data.participants!=null) {
      var participantNodes = this.state.data.participants.map(function(user){
        return (
          <li key={user.id}>{user.name}</li>
        );
      });
    } else {
      var participantNodes = <p></p>
    }
    return(
      <div className="inlineBlock topAligned">
        <b>Participants</b>
        <br />
        <div id="participants">
          <ul>
            {participantNodes}
          </ul>
        </div>
      </div>
    );
  }
});
