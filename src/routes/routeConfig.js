import React, { Component } from "react";
import { BrowserManager } from "./routeUrlChanger";
import { DynamicRouter } from "./dynamicRouter";

import { LoadingModule } from "./../Loader/moduleLoader";

//import {PRATIBHA_KEY_DEMO_STORE} from './../store/key/storeKey'

export class StackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      _route_module: LoadingModule
    };
  }
  mapStoreToUrl = (store, suffix) => {
    //`/store/${store}/${suffix}`
    return `/${suffix}`;
  };
  UNSAFE_componentWillMount() {
    const d = new DynamicRouter(this.state.screen.componentDest);
    d.loadComponent().then(cmp => {
      this.setState({ _route_module: cmp.default });
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps }, () => {
      console.log("property updated")
      console.log(nextProps)
      const d = new DynamicRouter(this.state.screen.componentDest);
      d.loadComponent().then(cmp => {
        this.setState({ _route_module: cmp.default });
      });
      //console.log("change history")
      //console.log(this.state.changeHistory)

      if (this.state.Id===0) {
        if(this.state.changeHistory){
          let b = new BrowserManager(window);
          let m = this.mapStoreToUrl(
            this.state.store_key,
            `components/${this.state.screen.name}`
          );
          b.updateRoute({}, this.state.name, m);
        }
      } else {
        if(this.state.changeHistory){
          let b = new BrowserManager(window);
          let m = this.mapStoreToUrl(
            this.state.store_key,
            `components/${this.state.screen.name}/${this.state.Id}`
          );
          b.updateRoute({}, this.state.name, m);
        }
      }
      /*if (this.state.changeHistory && !this.state.lookForComponentId) {
        let b = new BrowserManager(window);
        let m = this.mapStoreToUrl(
          this.state.store_key,
          `components/${this.state.screen.name}`
        );
        b.updateRoute({}, this.state.name, m);
      }
      if (this.state.changeHistory && this.state.lookForComponentId) {
        let b = new BrowserManager(window);
        let m = this.mapStoreToUrl(
          this.state.store_key,
          `components/${this.state.screen.name}/${this.state.Id}`
        );
        b.updateRoute({}, this.state.name, m);
      }*/
      //let m = window.location.href.split("components")[0];
      //b.updateRoute({},this.state.name,`/${this.state.screen.name}`)
    });
  }
  //   componentWillMount() {
  //     const d = new DynamicRouter(this.state.screen.componentDest);
  //     d.loadComponent().then(cmp => {
  //       this.setState({ _route_module: cmp.default });
  //     });
  //   }
  componentDidMount() {
    /*let b = new BrowserManager(window);
    let m = this.mapStoreToUrl(
      this.state.store_key,
      `components/${this.state.screen.name}`
    );
    //b.updateRoute({},this.state.name,`/${this.state.screen.name}`)
    b.updateRoute({}, this.state.name, m);*/



    if (this.state.Id===0) {
      let b = new BrowserManager(window);
      let m = this.mapStoreToUrl(
        this.state.store_key,
        `components/${this.state.screen.name}`
      );
      b.updateRoute({}, this.state.name, m);
    } else {
      let b = new BrowserManager(window);
      let m = this.mapStoreToUrl(
        this.state.store_key,
        `components/${this.state.screen.name}/${this.state.Id}`
      );
      b.updateRoute({}, this.state.name, m);
    }
  }
  render() {
    return <this.state._route_module />;
  }
}
