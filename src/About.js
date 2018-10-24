import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class About extends Component {
  render() {
    return (
      <div className="about">
        <div>
          <h2>
            Shopping for a new smartphone is exhausting and frustrating. Period.
          </h2>
          <p>
            {" "}
            You just want to buy the best product in your price range, right?
            But before you know it there are 20 tabs open and three hours have
            passed:
          </p>
          <br />
          <table className="youdontknow">
            <tbody>
              <tr>
                <td>
                  <p>
                    Does this smartphone have a{" "}
                    <span className="accentColor">headphone jack</span>?
                  </p>
                </td>
                <td>
                  <p>You don't know because amazon sure isn't telling you.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    Is the camera with <span className="accentColor">20</span>{" "}
                    Megapixels or <span className="accentColor">13</span>{" "}
                    Megapixels better?
                  </p>
                </td>
                <td>
                  <p>
                    You don't know because these numbers are meaningless without
                    context.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    Does this smartphone get{" "}
                    <span className="accentColor">regular updates</span>?
                  </p>
                </td>
                <td>
                  <p>
                    {" "}
                    You don't know, how about you check the last three
                    smartphones of the brand to estimate their trustworthiness
                    regarding updates.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <span className="accentColor">...</span>
                  </p>
                </td>
                <td>
                  <p>
                    <span className="accentColor">...</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <p>I think you understand the problem, but there is a solution...</p>
          <h2>We read the reviews and rate the important aspects:</h2>
          <p>
            You want to know if the{" "}
            <span className="accentColor">processor</span> is powerful and not
            what his name is.{" "}
          </p>
          <p>
            You want to know if the <span className="accentColor">updates</span>{" "}
            come regularly so you can use your smartphone for years.
          </p>
          <p>
            You want to know if the <span className="accentColor">camera</span>{" "}
            takes good pictures and not how many Megapixels it has.
          </p>
          <p>
            You want to know if the <span className="accentColor">battery</span>{" "}
            lasts you a day and not how many mAh it has.{" "}
          </p>
          <br />
          <br />
          <br />
          <div>
            <h2>
              We at smartphone-picker try our best to ensure that our smartphone
              data is correct and our ratings are appropriate. Still we can make
              mistakes and our ratings may be subject to bias.
            </h2>
            <p>
              If a particular specification or aspect is vital to you, we always
              recommend checking with the phone seller or reading trusted
              reviews online.
            </p>
            <p>
              If you think that any specification or rating is wrong or simply
              not fitting, please contact us{" "}
              <a className="" href="mailto:admin@smartphone-picker.com">
                here
              </a>
              .
            </p>
            <br />
            <br />
            <p>Legal stuff: </p>
            <p>
              <span className="accentColor">
                smartphone-picker is not responsible for any errors or
                omissions, or for the results obtained from the use of this
                information. All information on this site is provided “as is,”
                with no guarantee of completeness, accuracy, timeliness or the
                results obtained from the use of this information.
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
