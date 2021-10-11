import React from 'react';

class DemoException extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <section className="detail">
          <h3>You are almost there!</h3>
          <h4 className="alert-info">You do not see any contents here, since you did not yet activate the JSON API.</h4>
        </section>
        <div className="exception">
          <p>Activate the JSON API in the following way:</p>
          <ol>
            <li>Go to the Tomcat webapps directory where the OpenCms configuration files live, e.g., in <code>[TOMCAT_HOME]/webapps/[OPENCMS]/WEB-INF/config/</code>.</li>
            <li>Open the <code>opencms-system.xml</code> configuration file with your favorit text editor.</li>
            <li>Add the <code>org.opencms.xml.xml2json.CmsJsonResourceHandler</code> class at the end of the list of resource init handlers:
            <pre>{`<resourceinit>
  <resourceinithandler class="org.opencms.pdftools.CmsPdfResourceHandler" />
  <resourceinithandler class="org.opencms.jsp.userdata.CmsUserDataResourceHandler" />
  <resourceinithandler class="org.opencms.xml.xml2json.CmsJsonResourceHandler" />
</resourceinit>`}</pre>
            </li>
            <li>Restart Tomcat.</li>
          </ol>
        </div>
      </>
    )
  }
}

export default DemoException;
