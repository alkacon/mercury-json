import React from 'react';
import { navbar, dropdown, dropbtn, dropdowncontent } from './navbar.module.css';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.sitemap = props.sitemap;
  }

  render() {
    return (
      <div className={navbar}>
      {this.renderLevel(this.sitemap, 0)}
      </div>
    )
  }

  renderLevel(parent, level) {
    if (!parent) {
      return false;
    }
    const self = this;
    const items = this.getSortedNavbarItems(parent);
    const nextLevel = level + 1;
    const nav = items.map(function(resource) {
      const navText = resource.properties.NavText;
      const link = resource.link;
      if (self.isNavigationLevel(resource) && level < 2) {
        return (
          <div className={dropdown} key={link}>
            <button className={dropbtn}>{navText}
              <i className="fa fa-caret-down"></i>
            </button>
            <div className={dropdowncontent}>
            {self.renderLevel(resource.children, nextLevel)}
            </div>
          </div>
        )
      } else {
        return (
          <a href="#" key={link}>{navText}</a>
        )
      }
    });
    return nav;
  }

  showInDefaultNav(resourceName, resource) {
    const type = resource.attributes.type;
    const navInfo = resource.properties.NavInfo;
    let show = !resourceName.startsWith('.');
    if (show) {
      show = ['folder', 'subsitemap'].includes(type);
    }
    if (show) {
      show = navInfo != 'ignoreInDefaultNav';
    }
    return show;
  }

  isNavigationLevel(resource) {
    const isNavigationLevelFolder = resource.own_properties['default-file'] ===
        '##navigation_level_folder##';
    const isSubsitemap = resource.attributes.type === 'subsitemap';
    return isNavigationLevelFolder || isSubsitemap;
  }

  getSortedNavbarItems(parent) {
    const self = this;
    const items = [];
    Object.keys(parent).forEach(function(resourceName, idx) {
      const resource = parent[resourceName];
      if (self.showInDefaultNav(resourceName, resource)) {
        items.push(resource);
      }
    });
    items.sort(function(item, other) {
      const navPosItem = parseFloat(item.properties.NavPos);
      const navPosOther = parseFloat(other.properties.NavPos);
      if (navPosItem > navPosOther) {
        return 1;
      } else if (navPosItem < navPosOther) {
        return -1;
      }
      return 0;
    });
    return items;
  }
}

export default Navbar;
