// src/pages/HowItWorks.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  UploadCloud, 
  ShieldCheck, 
  UserCheck,
  Award,
  Trophy,
  TrendingUp,
  BadgeCheck
} from "lucide-react";

function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#1c1e22] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">How It Works</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center text-center">
            <UserCheck className="w-12 h-12 mb-4 text-blue-400" />
            <h2 className="text-xl font-semibold">1. Register & Join</h2>
            <p className="text-gray-400 mt-2">
              Sign up to become part of the e-waste warrior community. Track your uploads, points, and rewards.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <UploadCloud className="w-12 h-12 mb-4 text-green-400" />
            <h2 className="text-xl font-semibold">2. Upload E-Waste</h2>
            <p className="text-gray-400 mt-2">
              Take pictures of your broken electronics and add details like title, description, and pickup address.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 mb-4 text-purple-400" />
            <h2 className="text-xl font-semibold">3. Verification</h2>
            <p className="text-gray-400 mt-2">
              We evaluate your item's recyclability and condition. Accepted items earn you EcoPoints.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Award className="w-12 h-12 mb-4 text-yellow-400" />
            <h2 className="text-xl font-semibold">4. Earn EcoPoints</h2>
            <p className="text-gray-400 mt-2">
              Each accepted item gives you points. Track your progress and level up your recycling status.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Trophy className="w-12 h-12 mb-4 text-red-400" />
            <h2 className="text-xl font-semibold">5. Redeem Rewards</h2>
            <p className="text-gray-400 mt-2">
              Trade EcoPoints for cool rewards like headphones, power banks, discounts, or event tickets.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <TrendingUp className="w-12 h-12 mb-4 text-emerald-400" />
            <h2 className="text-xl font-semibold">6. Leaderboards</h2>
            <p className="text-gray-400 mt-2">
              Compete on global leaderboards and earn badges like Green Warrior or Eco Legend.
            </p>
            <Link to="/leaderboard" className="mt-4 text-blue-400 hover:underline">
              Go to Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-16 bg-[#25282d] rounded-xl p-8">
          <div className="flex flex-col items-center text-center">
            <BadgeCheck className="w-12 h-12 mb-4 text-blue-400" />
            <h2 className="text-2xl font-bold mb-4">Why It Matters</h2>
            <p className="text-gray-300 max-w-2xl">
              "Every broken gadget has value. We're building a cleaner future—one recycled item at a time. 
              Join us not just to win rewards, but to make a difference."
            </p>
            <p className="mt-4 text-emerald-400 font-medium">
              This isn't just an app, it's a mission. Let's fix the future, together.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/add-e-waste"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition duration-300 text-lg font-medium"
          >
            Join the Mission
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;