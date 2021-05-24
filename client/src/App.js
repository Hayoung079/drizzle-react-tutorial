import { Component } from "react";
import ReadString from './ReadString';
import SetString from "./SetString";

class App extends Component {
  state = { loading: true, drizzleState: null };

  //  앱 마운트 시
  componentDidMount() {
    const { drizzle } = this.props;
    console.log(this.props)

    // Store subscribe로 바꾸기
    this.unsubscribe = drizzle.store.subscribe(() => {

      // drizzleStore가 업데이트 될 때마다, drizzleState에 저장
      const drizzleState = drizzle.store.getState();

      //  drizzleState이 준비되었다면 component setState
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  // 앱 마운트 해제시 : unsubscribe -  메모리 누수 방지
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <ReadString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    )
  }
}

export default App;