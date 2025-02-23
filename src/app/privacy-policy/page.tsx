export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Privacy Policy</h1>
      <div className="prose prose-lg">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-6">
          We collect minimal information necessary to provide our services:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Email address (for account creation)</li>
          <li>Messages sent through our platform (stored securely)</li>
          <li>Basic usage analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          How We Use Your Information
        </h2>
        <p className="mb-6">Your information is used solely for:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Providing our anonymous messaging service</li>
          <li>Maintaining platform security</li>
          <li>Improving user experience</li>
          <li>Legal compliance when required</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your data.
          Messages are encrypted and stored securely on our servers.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          For privacy-related concerns, please contact us at
          privacy@blurtbox.com
        </p>
      </div>
    </div>
  );
}
