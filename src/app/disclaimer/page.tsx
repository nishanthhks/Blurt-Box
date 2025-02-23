export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Disclaimer</h1>
      <div className="prose prose-lg">
        <p className="mb-4">
          While BlurtBox strives to maintain a safe and secure platform for
          anonymous communication, we want to make our users aware of the
          following:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            BlurtBox is not responsible for the content of messages sent through
            our platform.
          </li>
          <li>
            While we maintain anonymity, we have zero tolerance for harassment,
            hate speech, or illegal activities.
          </li>
          <li>
            We reserve the right to cooperate with law enforcement in cases of
            illegal activity.
          </li>
          <li>
            Users are encouraged to report any abusive or inappropriate content.
          </li>
          <li>
            While we implement security measures, no online platform can
            guarantee 100% security.
          </li>
        </ul>
        <p>
          By using BlurtBox, you agree to these terms and understand the nature
          of anonymous communication platforms.
        </p>
      </div>
    </div>
  );
}
