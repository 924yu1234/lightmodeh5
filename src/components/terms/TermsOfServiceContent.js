/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';

export default function TermsOfServiceContent() {
  return (
    <StyledDiv className="terms-content">
      <div className="innerCell">
        <p>
          <span>Last updated: 16th July 2025</span>
        </p>
        <p>
          <span>
            This DeGate User Agreement (the "Agreement") is a contract between
            you ("User" or "you") and DeGate Inc. ("we", "us", "our", or "The
            Company") governing your access to and use of the DeGate services
            (the "Services", or "DeGate"). The Services include the DeGate
            mobile application and the website located at{' '}
            <span className="s1">
              <strong>
                <a
                  href="http://app.degate.com/"
                  className="external-link"
                  rel="nofollow"
                  target="__blank"
                >
                  <span>app.degate.com</span>
                </a>
              </strong>
            </span>
            .
          </span>
        </p>
        <p>
          <span>
            By using the Services—including, without limitation, creating a
            wallet, logging in with email or any third-party account, importing
            a wallet, or connecting a blockchain address through DeGate—you
            acknowledge that you have read, understood, and agree to be bound by
            this Agreement and all other applicable rules and policies,
            regardless of your location, nationality, or the specific Service
            you use. If you do not agree to these terms, do not access or use
            the Services.
          </span>
        </p>
        <p>
          <span>
            <span className="s1">
              <strong>PLEASE READ CAREFULLY:</strong>
            </span>{' '}
            Your use of DeGate is governed by this Agreement. You may access
            DeGate only if you fully accept and comply with these terms.
          </span>
        </p>

        <p>
          <h5>
            <strong>1. Nature of the Service</strong>
          </h5>
          <span>
            1.1<strong> DeGate.</strong> DeGate is a non-custodial digital
            wallet interface software. It generates or connects to distinct
            blockchain addresses on supported blockchain networks and signs
            transactions locally. We do not take possession of your digital
            assets or your private keys, recovery phrases, passwords, or
            hardware devices.
          </span>
          <br />
          <br />
          <span>
            1.2<strong> Architecture.</strong> Because each third-party
            blockchain ("chain") has its own address generation rule, DeGate
            provides separate addresses for each chain. Except for addresses
            created via email account login or other third-party account login
            (each, a "Source Account"), these addresses are under your sole
            custody. For addresses created through a Source Account, you rely on
            Privy (
            <a
              href="https://www.privy.io/"
              className="external-link"
              rel="nofollow"
              target="__blank"
            >
              <span>https://www.privy.io</span>
            </a>
            ) by Horkos Inc. to safeguard the corresponding private keys. You
            are solely responsible for selecting the correct network and address
            when sending or receiving assets.
          </span>
          <br />
          <br />
          <span>
            1.3<strong> No fiduciary relationship.</strong> Using DeGate does
            not create any partnership, agency, custody, or trust relationship
            between you and The Company.
          </span>
        </p>

        <p>
          <h5>
            <strong>2. Eligibility &amp; Compliance</strong>
          </h5>
          <span>
            2.1 You represent and warrant that you are legally permitted to use
            DeGate under the laws of your jurisdiction, and are not on any
            sanctions or restricted-party list.
          </span>
          <br />
          <span>
            2.2 You are solely responsible for reporting and paying any taxes
            arising from your digital-asset activities.
          </span>
        </p>

        <p>
          <h5>
            <strong>3. User Responsibilities</strong>
          </h5>
          <br />
          <span>
            3.1<strong> Key security.</strong>
          </span>
        </p>
        <p>
          <span>
            3.1.1
            <strong>
              <span> Wallets created by generating or importing a wallet.</span>
            </strong>
          </span>
        </p>
        <p>
          <span>
            Maintaining offline backups of your recovery phrases and private
            keys is the safest practice, and you acknowledge that we do not hold
            these credentials for you. You further understand that storing
            private keys in insecure environments—such as third-party cloud
            storage services—can expose them to security breaches, even though
            we strongly discourage such practices.
          </span>
        </p>
        <p>
          <span>3.1.2</span>
          <strong>
            <span> Wallets created via Source Account login.</span>
          </strong>
        </p>
        <p>
          <span>
            The security of wallets created through a Source Account depends on
            both the protection of that Source Account and the integrity of the
            Privy service (
            <a
              href="https://www.privy.io/"
              className="external-link"
              rel="nofollow"
              target="__blank"
            >
              <span>https://www.privy.io</span>
            </a>
            ) by Horkos Inc., which safeguards the corresponding private keys.
            Any compromise of your Source Account or any malfunction or breach
            of Privy could lead to total asset loss, for which you bear sole
            responsibility. Because the security level of a Source Account or
            the Privy service cannot be guaranteed, we strongly recommend
            keeping only small balances in these wallets.
          </span>
        </p>
        <p>
          <span>
            3.1.3
            <strong>
              <span> Wallets created through third-party wallet sign-in.</span>
            </strong>
          </span>
        </p>
        <p>
          <span>
            When you create a wallet through a third-party wallet sign-in, its
            security rests on the safety of that third-party wallet. Any breach
            of the third party wallet, or any leakage of the sign-in signature,
            can result in a total loss of assets. Signature leakage may occur,
            for example, if you sign in on a phishing site or if your device
            (such as a web browser) grants excessive access to malicious
            software like rogue browser extensions. You accept full
            responsibility for any losses arising from the use wallets created
            through third-party wallet sign-in, including, but not limited to,
            losses accused by breaches or signature leaks. Given the uncertain
            security of third-party wallets and your device environment, we
            strongly recommend that you keep only small balances in these
            wallets.
          </span>
        </p>
        <p>
          <span>
            3.2 <strong>Transaction review.</strong> You must review network
            fees, recipient addresses, chain IDs, approvals, and smart-contract
            calls before signing.
          </span>
          <br />
          <br />
          <span>
            3.3 <strong>Lawful use. </strong>You agree not to engage in, or
            attempt to engage in, any of the following categories of prohibited
            activity in relation to your access and use of DeGate:
          </span>
        </p>
        <ul>
          <li>
            <span>
              Intellectual Property Infringement. Activity that infringes on or
              violates any copyright, trademark, service mark, patent, right of
              publicity, right of privacy, or other proprietary or intellectual
              property rights under the law.
            </span>
          </li>
          <li>
            <span>
              Cyberattack. Activity that seeks to interfere with or compromise
              the integrity, security, or proper functioning of any computer,
              server, network, personal device, or other information technology
              system, including (but not limited to) the deployment of viruses
              and denial of service attacks.
            </span>
          </li>
          <li>
            <span>
              Fraud and Misrepresentation. Activity that seeks to defraud us or
              any other person or entity, including (but not limited to)
              providing any false, inaccurate, or misleading information in
              order to unlawfully obtain the property of another.
            </span>
          </li>
          <li>
            <span>
              Market Manipulation. Activity that violates any applicable law,
              rule, or regulation concerning the integrity of trading markets,
              including (but not limited to) the manipulative tactics commonly
              known as spoofing and wash trading.
            </span>
          </li>
          <li>
            <span>
              Securities and Derivatives Violations. Activity that violates any
              applicable law, rule, or regulation concerning the trading of
              securities or derivatives.
            </span>
          </li>
          <li>
            <span>
              Any Other Unlawful Conduct. Activity that violates any applicable
              law, rule, or another relevant jurisdiction.
            </span>
          </li>
        </ul>

        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-4.Third-PartyServices&amp;SmartContracts">
          <span>4. Third-Party Services and Smart Contracts</span>
        </h5>
        <p>
          DeGate may provide proprietary user interfaces ("UIs"), including but
          not limited to "Turbo Range", "Simple Earn", and "Earn", that enable
          users to interact with and access on-chain protocols and related smart
          contracts. Such protocols and smart contracts are developed, deployed,
          and maintained by third parties independent of DeGate. DeGate does not
          control, own, audit, or assume any responsibility for the operation,
          security, or integrity of any third-party smart contract or underlying
          protocol.
        </p>
        <p>
          Users acknowledge and agree that interactions with such protocols and
          smart contracts are undertaken entirely at their own risk. DeGate
          shall not be liable for, and users shall bear all losses arising from,
          any hacks, exploits, bugs, malfunctions, forks, or other changes
          affecting such third-party smart contracts or their underlying
          protocols.
        </p>
        <p>
          <span>
            While we strive to provide users with accurate and real-time
            information on digital asset prices and other relevant market data,
            we do not guarantee the accuracy of information provided by third
            party information providers. We strongly recommend users verify any
            information, including but not limited to pricing information,
            smart-contract risk etc., before relying on these information for
            decisions of any kind. The information is provided by and belongs to
            the individual information providers and we assume no ownership or
            any liability over any such information.
          </span>
        </p>
        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-5.Fees">
          <span>5. Fees</span>
        </h5>
        <p>
          <span>
            We may charge service fees (e.g., routing, aggregators). Blockchain
            network fees are set by DeGate according to the respective network
            and paid by you. There may also be other third party protocol fees
            that arise during your access and use of DeGate, including but not
            limited to your transfer of digital assets. You are solely
            responsible for paying any and all of these third party protocol
            fees that may arise.
          </span>
        </p>

        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-6.AssumptionofRisk">
          <span>6. Assumption of Risk</span>
        </h5>
        <p>
          <span>
            By accessing and using DeGate, you represent that you are
            financially and technically sophisticated enough to understand the
            inherent risks associated with using cryptographic and
            blockchain-based systems, and that you have a working knowledge of
            the usage and intricacies of digital assets such as bitcoin (BTC),
            ether (ETH), and other digital tokens such as those following the
            Ethereum Token Standard (ERC-20). In particular, you understand that
            blockchain-based transactions are irreversible.
          </span>
        </p>
        <p>
          <span>
            You further understand that the markets for these digital assets are
            highly volatile due to factors including (but not limited to)
            adoption, speculation, technology, security, and regulation. You
            acknowledge and accept that the cost and speed of transacting with
            cryptographic and blockchain-based systems are variable and may
            increase or decrease dramatically at any time. You further
            acknowledge and accept the risk that your digital assets may lose
            some or all of their value while they are supplied to third-party
            on-chain protocols through DeGate, you may suffer loss due to the
            fluctuation of prices of tokens in a trading pair. You understand
            that anyone can create a token, including fake versions of existing
            tokens and tokens that falsely claim to represent projects, and
            acknowledge and accept the risk that you may mistakenly trade those
            or other tokens. You further acknowledge that we are not responsible
            for any of these variables or risks, do not own third-party on-chain
            protocols, and cannot be held liable for any resulting losses that
            you experience while accessing or using these protocols.
            Accordingly, you understand and agree to assume full responsibility
            for all of the risks of accessing and using these protocols.
          </span>
        </p>
        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-7.DisclaimerofWarranties">
          <span>7. Disclaimer of Warranties</span>
        </h5>
        <p>
          <span>
            DEGATE AND ALL RELATED SERVICES ARE PROVIDED{' '}
            <strong>"AS IS" AND "AS AVAILABLE."</strong> WE DISCLAIM ALL IMPLIED
            WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </span>
        </p>
        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-8.LimitationofLiability">
          <span>8. Limitation of Liability</span>
        </h5>
        <p>
          <span>
            8.1 <strong>Exclusion of damages.</strong> IN NO EVENT WILL THE
            COMPANY BE LIABLE FOR LOST PROFITS, LOST DATA, LOSS OF GOODWILL,
            BUSINESS INTERRUPTION, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR
            CONSEQUENTIAL DAMAGES, HOWEVER IT ARISES (INCLUDING ATTORNEYS’ FEES
            AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR
            AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR
            ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT,
            NEGLIGENCE, OR OTHER TORTIOUS ACTION, INCLUDING WITHOUT LIMITATION
            ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS
            AGREEMENT OR ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
            REGULATIONS, EVEN IF THE COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGE. SOME JURISDICTIONS DO NOT ALLOW THE
            EXCLUSION OR LIMITATION OF SUCH DAMAGES, SO THE PRIOR LIMITATION OR
            EXCLUSION MAY NOT APPLY TO YOU.
          </span>
        </p>
        <p>
          <span>
            8.2 <strong>User fault.</strong> We bear{' '}
            <strong>no responsibility</strong> for losses caused by (i) loss or
            compromise of private keys; (ii) malware, phishing, or hacks of your
            device; (iii) transactions sent to wrong or incompatible addresses;
            (iv) smart-contract vulnerabilities; or (v) forks, airdrops,
            protocol bugs, or network congestion.
          </span>
        </p>
        <p>
          <span>
            8.3{' '}
            <strong>Mandatory Compensation for Verified DeGate Fault.</strong>
            <br />
            <br />
            Notwithstanding Sections 6, 7, and 8.1–8.2 of this Agreement, if a
            User suffers a direct and actual loss of digital assets solely and
            directly caused by a material failure of DeGate’s proprietary code,
            infrastructure, or operational processes (a "DeGate Fault"), DeGate
            Home DAO shall compensate the affected User for the full amount of
            such verified loss, subject to the limits set forth in this Section.
            <br />
            <br />
            For the avoidance of doubt, compensation under this Section applies
            only to losses directly attributable to a DeGate Fault, and excludes
            any losses arising from market movements, third-party protocols,
            third-party smart contracts, force majeure events, or User error.
            <br />
            <br />
            <strong>
              User-Level Compensation Caps by Wallet Access Method.
            </strong>
            <br />
            <br />
            Where the affected wallet was created or accessed using one of the
            following methods, compensation payable to a User under this Section
            shall be subject to the corresponding per-User cap, even where the
            loss was solely caused by a DeGate Fault:
            <br />
            <br />
            (a) <strong>Wallets created via email login:</strong> compensation
            shall be capped at <strong>USD 3,000 per User.</strong>
            <br />
            <br />
            (b){' '}
            <strong>
              Wallets created via "Sign in with Wallet" on the web (including
              desktop and mobile web):{' '}
            </strong>
            compensation shall be capped at{' '}
            <strong>USD 10,000 per User.</strong>
            <br />
            <br />
            (c) <strong>Wallets created via "Sync from Web":</strong>{' '}
            compensation shall be subject to the same per-User compensation cap
            applicable to the originating web wallet from which such wallet was
            synced.
            <br />
            <br />
            The User acknowledges that DeGate provides in-product notices
            indicating that certain wallet types are not designed to store large
            amounts of assets and may display recommended balance thresholds.
            Such notices are intended to inform Users of design limitations and
            risk considerations and do not alter the compensation caps set forth
            in this Agreement. Users are encouraged to manage balances
            accordingly or use alternative wallet types without such limitations
            where appropriate.
            <br />
            <br />
            The aggregate amount of compensation payable under this Section
            shall not exceed the net assets held by DeGate Home DAO at the time
            such losses are formally determined. All claims shall be subject to
            a verification and determination process conducted by DeGate Home
            DAO in good faith.
          </span>
        </p>

        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-9.Indemnification">
          <span>9. Indemnification</span>
        </h5>
        <p>
          <span>
            You agree to indemnify and hold The Company harmless from any claim,
            loss, or expense (including reasonable legal fees) arising out of
            your (i) use or misuse of DeGate, (ii) violation of this Agreement,
            or (iii) violation of any law or third-party right.
          </span>
        </p>
        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-10.Modifications">
          <span>10. Modifications</span>
        </h5>
        <p>
          <span>
            We reserve the right, in our sole discretion, to modify this
            Agreement from time to time. We may amend this Agreement by posting
            an updated version in-app or on our website. If we make any
            modifications, we will notify you by updating the date at the top of
            the Agreement and by maintaining a current version of the Agreement
            at
            <a
              href="https://app.degate.com/terms"
              className="external-link"
              rel="nofollow"
              target="__blank"
            >
              <span>app.degate.com/terms</span>
            </a>
            . All modifications will be effective when they are posted, and your
            continued accessing or use of DeGate will serve as confirmation of
            your acceptance of those modifications. If you do not agree with any
            modifications to this Agreement, you must immediately stop accessing
            and using DeGate.
          </span>
        </p>
        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-11.Termination">
          <span>11. Termination</span>
        </h5>
        <p>
          <span>
            You may cease using DeGate at any time. We may suspend or terminate
            your access, or discontinue DeGate, with or without notice. Sections
            1, 3, 6–10, and 12 survive termination.
          </span>
        </p>
        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-12.Miscellaneous">
          <span>12. Miscellaneous</span>
        </h5>
        <p>
          <span>
            If any provision is held invalid, the remainder remains in force.
            Our failure to enforce any right is not a waiver. You may not assign
            this Agreement without our prior written consent; we may assign
            freely. This Agreement constitutes the entire agreement between you
            and The Company regarding DeGate.
          </span>
        </p>
        <h5 id="Final_Version_DeGateTermsofUse(DA站点)-12.Miscellaneous">
          <span>13. Communications and Marketing Consent</span>
        </h5>
        <p>
          <span>
            By using DeGate, you agree that we may send you service-related
            communications (such as transaction alerts, security updates, or
            changes to this Agreement) through the app or to any contact method
            you provide.
            <br />
            If you opt in, we may also send you marketing communications—such as
            product updates, news, or promotions—via email. These emails will
            include an unsubscribe link that allows you to opt out at any time.
            <br />
            Opting out of marketing emails will not affect your receipt of
            essential service-related communications.
          </span>
        </p>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 100%;
  color: ${(props) => props.theme.t_b7b_80};
  ${(props) => props.theme.fontRegular};
  font-size: 14px;
  line-height: 20px;

  .content-title {
    ${(props) => props.theme.fontBold};
    font-size: 18px;
    line-height: 22px;
  }

  p {
    margin-bottom: 25px;
  }

  strong {
    ${(props) => props.theme.fontBold};
    color: ${(props) => props.theme.t_b7b_80};
    font-size: 14px;
    line-height: 20px;
    margin: 20px 0 10px;
  }

  h5,
  h5 strong {
    ${(props) => props.theme.fontBold};
    color: ${(props) => props.theme.t_fff};
    font-size: 14px;
    line-height: 20px;
    margin: 0px 0 10px;
  }
  ul {
    margin-bottom: 25px;
    padding-left: 20px;
    li {
      list-style: disc;
      margin-bottom: 10px;
    }
  }
`;
