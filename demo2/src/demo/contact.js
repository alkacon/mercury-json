import React from 'react';
import Image from './image'

/**
 * Class representing a contact content.
 * @see {@link http://localhost/system/modules/alkacon.mercury.template/schemas/contact.xsd}
 */
class Contact extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.demo = props.demo;
    this.content = props.content;
    this.mode = props.mode;
    this.handleClickDetail = this.handleClickDetail.bind(this);
  }

  /**
   * Returns the email of this contact.
   */
  get email() {
    let contact = this.localeContent.Contact;
    if (contact && contact.Email) {
      return contact.Email.Email;
    }
    return false;
  }

  /**
   * Returns the content path of this contact.
   */
  get file() {
    return this.content.path;
  }

  /**
   * Returns the first name of this contact.
   */
  get firstName() {
    const name = this.localeContent.Name;
    if (name) {
      return name.FirstName;
    }
    return false;
  }

  get image() {
    return this.localeContent.Image;
  }

  /**
   * Returns the kind of this contact.
   */
  get kind() {
    const kind = this.content.localeContent.Kind;
    return kind ? kind : false;
  }

  /**
   * Returns the last name of this contact.
   */
  get lastName() {
    const name = this.localeContent.Name;
    if (name) {
      return name.LastName;
    }
    return false;
  }

  /**
   * Returns the localized content. Depending on whether request parameter
   * wrapper was set to true or false, the localized content is either
   * contained in this.content.localeContent (true) or in this.content (false);
   */
  get localeContent() {
    return this.content.localeContent ? this.content.localeContent :
        this.content;
  }

  /**
   * Returns the locality of this contact.
   */
  get locality() {
    const contact = this.localeContent.Contact;
    const address = contact.AddressChoice.Address;
    const poiLink = contact.AddressChoice.PoiLink;
    if (address) { // nested address?
      return address.Locality;
    } else if (poiLink) { // linked content?
      const path = poiLink.path;
      const linkedContent = this.content.linkedContents[path];
      const address = linkedContent.localeContent.Address;
      const locality = address.Locality;
      if (locality) {
        return locality;
      }
    }
    return false;
  }

  /**
   * Returns the mobile phone number of this contact.
   */
  get mobile() {
    const contact = this.localeContent.Contact;
    if (contact) {
      return contact.Mobile;
    }
    return false;
  }

  /**
   * Returns the organization name of this contact.
   */
  get organization() {
    const organization = this.localeContent.Organization;
    return organization;
  }

  /**
   * Returns the phone of this contact.
   */
  get phone() {
    const contact = this.localeContent.Contact;
    if (contact) {
      return contact.Phone;
    }
    return false;
  }

  /**
   * Returns the position of this contact.
   */
  get position() {
    const position = this.localeContent.Position;
    return position;
  }

  /**
   * Returns the postal code of this contact.
   */
  get postalCode() {
    const contact = this.localeContent.Contact;
    const address = contact.AddressChoice.Address;
    const poiLink = contact.AddressChoice.PoiLink;
    if (address) { // nested address?
      return address.PostalCode;
    } else if (poiLink) { // linked content?
      const path = poiLink.path;
      const linkedContent = this.content.linkedContents[path];
      const address = linkedContent.localeContent.Address;
      const postalCode = address.PostalCode;
      if (postalCode) {
        return postalCode;
      }
    }
    return false;
  }

  /**
   * Returns the street address of this contact.
   */
  get streetAddress() {
    const contact = this.localeContent.Contact;
    const address = contact.AddressChoice.Address;
    const poiLink = contact.AddressChoice.PoiLink;
    if (address) { // nested address?
      return address.StreetAddress;
    } else if (poiLink) { // linked content?
      const path = poiLink.path;
      const linkedContent = this.content.linkedContents[path];
      const address = linkedContent.localeContent.Address;
      const streetAddress = address.StreetAddress;
      if (streetAddress) {
        return streetAddress;
      }
    }
    return false;
  }

  /**
   * Handler. Called when clicking on the read more link.
   */
  handleClickDetail(content) {
    this.demo.loadContentDetail(content);
  }

  /**
   * Renders this component.
   */
  render() {
    if (this.mode === 'preview') {
      return this.renderPreview();
    } else {
      return this.renderDefault();
    }
  }

  /**
   * Renders a detail view of this contact.
   */
  renderDefault() {
    const personContact = this.kind === 'person' ? (
      <>
        <h4>Email: <a href={'email:' + this.email}>{this.email}</a></h4>
        <h4>Mobile: {this.mobile}</h4>
      </>
    ) : false;
    return (
      <section className="detail">
        <h2>{this.firstName} {this.lastName} <small>{this.position}</small></h2>
        <h4><strong>{this.organization}</strong></h4>
        <h4>{this.streetAddress}</h4>
        <h4>{this.postalCode} {this.locality}</h4>
        <Image demo={this.demo} content={this.image}
            alt={this.firstName + ' ' + this.lastName + ', ' + this.position}/>
        {personContact}
        <h4>Phone: {this.phone}</h4>
      </section>
    )

  }

  /**
   * Renders a contact preview to be used in a list view.
   */
  renderPreview() {
    const title = this.kind === 'person' ?
        this.firstName + ' ' + this.lastName : this.organization;
    return (
      <div className="list">
        <Image demo={this.demo} content={this.image} alt={title}/>
        <div>
          <small>m-contact</small>
          <h3>{title}</h3>
          <a href="#" onClick={(e) => this.handleClickDetail(this.file, e)}>Read more</a>
        </div>
      </div>
    )
  }
}

export default Contact;
