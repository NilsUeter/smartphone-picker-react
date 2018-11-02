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
            <h2>Impressum</h2>
            <br />
            <p>
              <b>Geschäftsführer:</b> Nils Ueter und Martin Schulze Beckendorf
            </p>
            <p>
              <b>Redaktionell Verantwortlicher:</b> Nils Ueter
            </p>
            <p>
              <b>Kontakt</b> unter admin@smartphone-picker.com
            </p>
            <br />
            <h3>1. Warnhinweis zu Inhalten</h3>
            <br />
            <p>
              Die kostenlosen und frei zugänglichen Inhalte dieser Webseite
              wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser
              Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und
              Aktualität der bereitgestellten kostenlosen und frei zugänglichen
              journalistischen Ratgeber und Nachrichten.
            </p>
            <br />
            <h3>2. Externe Links</h3>
            <br />
            <p>
              Diese Website enthält Verknüpfungen zu Websites Dritter ("externe
              Links"). Diese Websites unterliegen der Haftung der jeweiligen
              Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der
              externen Links die fremden Inhalte daraufhin überprüft, ob etwaige
              Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine
              Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss
              auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der
              verknüpften Seiten. Das Setzen von externen Links bedeutet nicht,
              dass sich der Anbieter die hinter dem Verweis oder Link liegenden
              Inhalte zu Eigen macht. Eine ständige Kontrolle der externen Links
              ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße
              nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch
              derartige externe Links unverzüglich gelöscht.
            </p>
            <br />
            <h3>3. Urheber- und Leistungsschutzrechte</h3>
            <br />
            <p>
              Die auf dieser Website veröffentlichten Inhalte unterliegen dem
              deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen
              Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung
              bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder
              jeweiligen Rechteinhabers. Dies gilt insbesondere für
              Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung,
              Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder
              anderen elektronischen Medien und Systemen. Inhalte und Rechte
              Dritter sind dabei als solche gekennzeichnet. Die unerlaubte
              Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter
              Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung
              von Kopien und Downloads für den persönlichen, privaten und nicht
              kommerziellen Gebrauch ist erlaubt.
            </p>
            <br />
            <h3>4. Affliate Links</h3>
            <br />
            <p>Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
