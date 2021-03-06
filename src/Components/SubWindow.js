import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

// ポップアップウィンドウの作り方
// スタイルのコピーも行う
// https://medium.com/hackernoon/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // true for inline styles
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) { // true for stylesheets loaded from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}


class SubWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    // STEP 1: create a container <div>
    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }
  
  render() {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    // this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    this.externalWindow = window.open('', '', 'width='+this.props.width+',height='+this.props.height+',left=200,top=200');

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    this.externalWindow.document.body.appendChild(this.containerEl);

    copyStyles(document, this.externalWindow.document);

    // update the state in the parent component if the user closes the 
    // new window
    this.externalWindow.addEventListener('beforeunload', () => {
      this.props.closeWindowPortal();
    });
  }

  componentWillUnmount() {
    // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by closing the window
    this.externalWindow.close();
  }
}

SubWindow.propTypes = {
  children: PropTypes.element,
  width: PropTypes.string,
  height: PropTypes.string,
  closeWindowPortal: PropTypes.func,
};

export default SubWindow;