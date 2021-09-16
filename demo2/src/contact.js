import React from 'react';

/**
 * Class representing a component for a contact content.
 */
class Contact extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.demo2 = props.demo2;
    this.content = props.content;
  }

  /**
   * Returns the email of this contact. Null safe.
   */
  get email() {
    let contact = this.content.localeContent.Contact;
    if (contact && contact.Email) {
      return contact.Email.Email;
    }
    return false;
  }

  /**
   * Returns the first name of this contact. Null safe.
   */
  get firstName() {
    const name = this.content.localeContent.Name;
    if (name) {
      return name.FirstName;
    }
    return false;
  }

  /**
   * Returns the image URL of this contact. Null safe.
   */
  get imageSrc() {
    const image = this.content.localeContent.Image;
    if (image) {
      return this.demo2.SERVER + image.Image.link;
    }
    return false;
  }

  /**
   * Returns the kind of this contact. Null safe.
   */
  get kind() {
    const kind = this.content.localeContent.Kind;
    return kind ? kind : false;
  }

  /**
   * Returns the last name of this contact. Null safe.
   */
  get lastName() {
    const name = this.content.localeContent.Name;
    if (name) {
      return name.LastName;
    }
    return false;
  }

  /**
   * Returns the locality of this contact. Null safe.
   */
  get locality() {
    const contact = this.content.localeContent.Contact;
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
   * Returns the mobile of this contact. Null safe.
   */
  get mobile() {
    const contact = this.content.localeContent.Contact;
    if (contact) {
      return contact.Mobile;
    }
    return false;
  }

  /**
   * Returns the organization of this contact. Null safe.
   */
  get organization() {
    const organization = this.content.localeContent.Organization;
    return organization;
  }

  /**
   * Returns the phone of this contact. Null safe.
   */
  get phone() {
    const contact = this.content.localeContent.Contact;
    if (contact) {
      return contact.Phone;
    }
    return false;
  }

  /**
   * Returns the position of this contact. Null safe.
   */
  get position() {
    const position = this.content.localeContent.Position;
    return position;
  }

  /**
   * Returns the postal code of this contact. Null safe.
   */
  get postalCode() {
    const contact = this.content.localeContent.Contact;
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
   * Returns the street address of this contact. Null safe.
   */
  get streetAddress() {
    const contact = this.content.localeContent.Contact;
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
   * Renders this component.
   */
  render() {
    const personContact = this.kind === 'person' ? (
      <>
        <h4>Email: <a href={'email:' + this.email}>{this.email}</a></h4>
        <h4>Mobile: {this.mobile}</h4>
      </>
    ) : false;
    return (
      <>
        <h2>{this.firstName} {this.lastName} <small>{this.position}</small></h2>
        <h4><strong>{this.organization}</strong></h4>
        <h4>{this.streetAddress}</h4>
        <h4>{this.postalCode} {this.locality}</h4>
        <img src={this.imageSrc}
             alt={this.firstName + ' ' + this.lastName + ', ' + this.position}/>
        {personContact}
        <h4>Phone: {this.phone}</h4>
      </>
    )
  }
}

export default Contact;
