// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Stylesheets
import style from './MainNavigation.module.scss';


import logoDev from "lib/assets/images/svg/geonorge-navbar-logo_dev.svg";
import logoTest from "lib/assets/images/svg/geonorge-navbar-logo_test.svg";
import logo from "lib/assets/images/svg/geonorge-navbar-logo.svg";




class MainNavigation extends React.Component {
  getGeonorgeLogo() {
      const imageSrc = () => {
          switch (process.env.REACT_APP_ENVIRONMENT) {
              case 'dev':
                  return logoDev;
              case 'test':
                  return logoTest;
              default:
                  return logo;
          }
      };
      return imageSrc();
  };

  renderTabs() {
        let radioButtons = this.state.tabs.map((tab, i) => {
            let tabClass = this.props.selectedSearchResultsType === tab.id ? style.radioButton + ' active' : style.radioButton;
            let counterValue = this.getCounterValue(tab.id, tab.counterProperty);
            let radioButtonIcon = this.props.selectedSearchResultsType === tab.id ? ['far', 'dot-circle'] : ['far', 'circle'];
            let selectedCategory = this.props.selectedSearchResultsType ? this.props.selectedSearchResultsType : 'metadata';
            return selectedCategory === tab.id ? (
                <li key={i} className={tabClass}>
                    <span>
                        <FontAwesomeIcon icon={radioButtonIcon} className={style.radio} />
                        {this.props.getResource(tab.nameResourceKey, tab.nameResourceFallback)} <b>({counterValue})</b>
                    </span>
                </li>
            ) : (
                    <li key={i} className={tabClass}>
                        <Link to={{ pathname: `/${tab.id}`, search: `text=${this.props.searchString}` }}>
                            <FontAwesomeIcon icon={radioButtonIcon} className={style.radio} />
                            {this.props.getResource(tab.nameResourceKey, tab.nameResourceFallback)} <b>({counterValue})</b>
                        </Link>
                    </li>
                );
        });
        return (
            <ul className={style.radioButtons}>
                {radioButtons}
            </ul>
        );
    }

  renderDownloadButton(){
    return '';
  }

  render() {
    return (<div className={style.mainNavigationContainer}>
      <div className={style.mainNavigation + ' container'}>
        <a href="#">
          <div className={style.logo}>
            <img src={this.getGeonorgeLogo()} alt="Geonorge logo"/>
          </div>
        </a>
        <div className={style.search}>
          {/* <ErrorBoundary><SearchBar/></ErrorBoundary> */}
          {/* {this.renderTabs()} */}
        </div>
        {/* <GeonorgeMenuButton geonorgeMenu={this.props.geonorgeMenu} multilingual="multilingual"/> {this.renderMapbutton()} */}
        {this.renderDownloadButton()}
      </div>
    </div>)
  }
}

export default MainNavigation;
