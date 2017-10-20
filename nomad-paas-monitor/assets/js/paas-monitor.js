moment.updateLocale('en', {
    relativeTime : {
        future: "%s",
        past:   "%s",
        s:  "%ds",
        m:  "%dm",
        mm: "%dm",
        h:  "%dh",
        hh: "%dh",
        d:  "%dd",
        dd: "%dd",
        M:  "%dm",
        MM: "%dm",
        y:  "%dy",
        yy: "%dy"
    }
});

/**
 * Details
 */
var Details = React.createClass({
  render: function() {
    var known = [
      "HOSTNAME",
      "NOMAD_ADDR_http",
      "NOMAD_ALLOC_DIR",
      "NOMAD_ALLOC_ID",
      "NOMAD_ALLOC_INDEX",
      "NOMAD_ALLOC_NAME",
      "NOMAD_CPU_LIMIT",
      "NOMAD_HOST_PORT_http",
      "NOMAD_IP_http",
      "NOMAD_MEMORY_LIMIT",
      "NOMAD_PORT_http",
      "NOMAD_TASK_DIR",
      "NOMAD_TASK_NAME",

      // Self defined (attribute name . replaces with _ and uppercased)
      "NODE_UNIQUE_ID",
      "NODE_UNIQUE_NAME",
      "NODE_DATACENTER",
      "NODE_CLASS",
      "ATTR_ARCH",
      "ATTR_OS_NAME",
      "ATTR_OS_VERSION",
      "ATTR_KERNEL_NAME",
      "ATTR_KERNEL_VERSION",
      "ATTR_CPU_NUMCORES",
      "ATTR_HOSTNAME",
      "ATTR_DRIVER_DOCKER_VERSION"
    ];
    var variables = this.props.variables;
    var keys = Object.getOwnPropertyNames(variables);
    return (
      <div id="details">
        <div className="node">
          <table>
            <thead>Node</thead>
            <tbody>
              <tr>
                <td className="key">ID</td>
                <td className="value">{variables["NODE_UNIQUE_ID"]}</td>
              </tr>
              <tr>
                <td className="key">Hostname</td>
                <td className="value">{variables["NODE_UNIQUE_NAME"]}</td>
              </tr>
              <tr>
                <td className="key">Datacenter</td>
                <td className="value">{variables["NODE_DATACENTER"]}</td>
              </tr>
              <tr>
                <td className="key">OS</td>
                <td className="value">{variables["ATTR_OS_NAME"]} {variables["ATTR_OS_VERSION"]}</td>
              </tr>
              <tr>
                <td className="key">Kernel</td>
                <td className="value">{variables["ATTR_KERNEL_NAME"]} {variables["ATTR_KERNEL_VERSION"]}</td>
              </tr>
              <tr>
                <td className="key">Architecture</td>
                <td className="value">{variables["ATTR_ARCH"]}</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              </tbody>
              <thead>Docker</thead>
              <tbody>
              <tr>
                <td className="key">ID</td>
                <td className="value">{variables["HOSTNAME"]}</td>
              </tr>
              <tr>
                <td className="key">Version</td>
                <td className="value">{variables["ATTR_DRIVER_DOCKER_VERSION"]}</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
            </tbody>
            <thead>Allocation</thead>
            <tbody>
              <tr>
                <td className="key">ID</td>
                <td className="value">{variables["NOMAD_ALLOC_ID"]}</td>
              </tr>
              <tr>
                <td className="key">Name</td>
                <td className="value">{variables["NOMAD_ALLOC_NAME"]}</td>
              </tr>
              <tr>
                <td className="key">CPU</td>
                <td className="value">{variables["NOMAD_CPU_LIMIT"]}</td>
              </tr>
              <tr>
                <td className="key">Memory</td>
                <td className="value">{variables["NOMAD_MEMORY_LIMIT"]}</td>
              </tr>
              <tr>
                <td className="key">Port</td>
                <td className="value">{variables["NOMAD_PORT_http"]}</td>
              </tr>
              <tr>
                <td className="key">Directory</td>
                <td className="value">{variables["NOMAD_ALLOC_DIR"]}</td>
              </tr>
              <tr>
                <td className="key">Task</td>
                <td className="value">{variables["NOMAD_TASK_NAME"]}</td>
              </tr>
              <tr>
                <td className="key">Local</td>
                <td className="value">{variables["NOMAD_TASK_DIR"]}</td>
              </tr>
              <tr>
                <td className="key">Address</td>
                <td className="value">{variables["NOMAD_ADDR_http"]}</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
            </tbody>
            <thead>Other</thead>
            <tbody>
            {keys.map(function(key, index) {
              var counter = 0;
              if(known.indexOf(key) == -1) {
                return (
                  <tr key={index}>
                    <td className="key">{key}</td>
                    <td className="value">{variables[key]}</td>
                  </tr>
                )
              }
            })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});

/**
 * Uptime
 */
var Uptime = React.createClass({
  formatUptime: function(timestamp) {
    var x = timestamp / 1000;
    var seconds = x % 60;
    x /= 60;
    var minutes = x % 60;
    x /= 60;
    var hours = x % 24;
    x /= 24;
    var days = x;

    return {
      hours: ('0' + Math.floor(hours)).substr(-2),
      minutes: ('0' + Math.floor(minutes)).substr(-2),
      seconds: ('0' + Math.floor(seconds)).substr(-2)
    }
  },
  render: function() {
    var uptime = this.formatUptime(Math.round((new Date().getTime() - this.props.start)));
    return (
      <div id="uptime">
        <i className="fa fa-fw fa-clock-o"></i> <span className="time">{uptime.hours}<span className="light-purple">h</span> {uptime.minutes}<span className="light-purple">m</span> {uptime.seconds}<span className="light-purple">s</span></span>
      </div>
    )
  }
});

/**
 * Message
 */
var Message = React.createClass({
  render: function() {
    var message = this.props.message;
    var since = moment(message.timestamp).fromNow();
    var content = $('<textarea />').html(message.message).text();

    return (
      <li className="message">
          <div className="title">
            <span className="author">{message.author}</span> <span className="seperator">&middot;</span> <time className="timestamp">{since}</time>
          </div>
          <p className="content">{content}</p>
      </li>
    )
  }
});

/**
 * Message List
 */
var MessageList = React.createClass({
  render: function() {
    var messages = this.props.messages;
    if (messages.length > 0) {
      return (
        <div id="messages">
          <ul>
          {messages.map(function(message) {
            return <Message key={message.id} message={message}/>
          })}
          </ul>
        </div>
      )
    } else {
      return (
        <div id="messages">
          <p>No messages received from peers.</p>
        </div>
      )
    }
  }
});

/**
 * Environment
 */
var Environment = React.createClass({
  render: function() {
    var variables = this.props.variables;
    var keys = Object.getOwnPropertyNames(variables);
    return (
      <div id="environment">
        <table>
          <tbody>
          {keys.map(function(key, index) {
            var counter = 0;
            return (
              <tr key={index}>
                <td className="key">{key}</td>
                <td className="value">{variables[key]}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
});

/**
 * Kill Button
 */
var KillButton = React.createClass({
  render: function() {
    if(this.props.status == "on") {

    } else if(this.props.status == "pending") {
    } else {
    }
    return (
      <div id="killme" className={this.props.status}>
        <div className="tray" onClick={this.props.onClick}>
          <div className="switch"></div>
        </div>
      </div>
    )
  }
});

var Logo = React.createClass({
  render: function() {
    return (
      <div id="logo">
        <h1>PAAS</h1>
        <h2>Monitor</h2>
      </div>
    )
  }
});

/**
 * Header
 */
var Header = React.createClass({
  render: function() {
    return (
      <Logo/>
    )
  }
});

/**
 * Paas Monitor
 */
var PaasMonitor = React.createClass({
  getInitialState: function() {
    return {
      identifier: "",
      environment: {},
      status: "on",
      start: this.props.start
    };
  },

  kill: function() {
    this.setState({
      status: "off",
    });
    $.get("/kill");
  },

  revive: function() {
    this.setState({
      status: "pending"
    });

    // Retrying until alive.
    var self = this;
    var reboot = setInterval(function() {
      var checkHealth = $.get("/health", function (result) {
        if(result == "ok") {
          self.setState({
            status: "on",
            start: new Date().getTime()
          });
          clearInterval(reboot);
        }
      }.bind(this), "json");
    }, 5000);

  },

  render: function() {
    var powerButton;
    var mainContent;
    if (this.state.status == "on") {
      powerButton = <KillButton status={this.state.status} onClick={this.kill}/>
      mainContent = <div id="columns"><LeftColumn environment={this.props.environment} identifier={this.props.identifier}/><RightColumn messages={this.props.messages}/></div>
    } else if (this.state.status == "pending") {
      powerButton = <KillButton status={this.state.status} onClick={null}/>
      mainContent = <div id="dead">I'm resurrecting! ;O</div>
    } else {
      powerButton = <KillButton status={this.state.status} onClick={this.revive}/>
      mainContent = <div id="dead">I'm dead :(</div>
    }

    return (
      <div id="paasmonitor">
        <header>
          <Header/>
          <ul>
            <li><Uptime start={this.state.start}/></li>
            <li>{powerButton}</li>
          </ul>
        </header>
        {mainContent}
      </div>
    )
  }
});

var RightColumn = React.createClass({
  render: function() {
    return (
      <div id="right">
        <MessageList messages={this.props.messages}/>
      </div>
    )
  }
});

var LeftColumn = React.createClass({
  render: function() {
    return (
      <div id="left">
        <Details variables={this.props.environment}/>
      </div>
    )
  }
});

/**
 * Entrypoint
 */
var start = 0;
$.get("/uptime", function (result) {
  start = result;
}, "json");

var messages = [];
var environment = {};
var identifier = "";
setInterval(function() {
  // Fetch information if not dead.
  if(!document.getElementById('dead')) {
    // Fetch messages
    $.get("/messages", function(result) {
      messages = result.reverse();
    }, "json");

    // Fetch environment variables
    $.get("/environment", function (result) {
      environment = result;
    }, "json");

    // Fetch id
    $.get("/id", function (result) {
      identifier = result
    }, "json");
  }

  var app = ReactDOM.render(
    <PaasMonitor messages={messages} environment={environment} identifier={identifier} start={start}/>,
    document.getElementById('container')
  );
}, 1000);
