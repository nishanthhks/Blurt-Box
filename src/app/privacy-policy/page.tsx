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
          <li>Messages sent through our platform (stored securely but not end-to-end encrypted)</li>
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
          However, messages are not end-to-end encrypted, which means they can be
          accessed by authorized personnel if necessary (e.g., for moderation or
          legal compliance).
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          For privacy-related concerns, please contact us at
          <a href="mailto:privacy@blurtbox.com" className="text-blue-600"> privacy@blurtbox.com</a>.
        </p>
      </div>
    </div>
  );
}
