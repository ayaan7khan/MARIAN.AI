'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { ChatHistory } from './ChatHistory';
import { Conversation } from '@/types/chat';
import { UserProfile } from '@/types/user';
import {
  User,
  Plus,
  Search,
  Settings,
  FolderKanban,
  Calendar,
  X,
  Sparkles,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onTogglePin: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  user: UserProfile | null;
  onLogout: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  guestMessageCount?: number;
  maxGuestMessages?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
  onTogglePin,
  onDeleteConversation,
  isOpenMobile = false,
  onCloseMobile,
  guestMessageCount = 0,
  maxGuestMessages = 5,
}) => {
  const { user: clerkUser, isSignedIn } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin =
    isSignedIn &&
    (clerkUser?.publicMetadata?.role === 'admin' ||
      clerkUser?.primaryEmailAddress?.emailAddress?.endsWith('@marian.ai') ||
      clerkUser?.primaryEmailAddress?.emailAddress === 'admin@marian.ai' ||
      clerkUser?.username === 'admin' ||
      process.env.NODE_ENV === 'development');

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#080808] border-r border-[#242424] w-64 select-none">
      {/* Header & Logo */}
      <div className="p-4 flex items-center justify-between border-b border-[#242424]">
        <Logo size="sm" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 text-[#A1A1AA] hover:text-[#F5F5F0]"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Guest Trial Status Banner */}
      {!isSignedIn && (
        <div className="mx-3 mt-3 p-2.5 rounded-xl bg-[#0D0D0D] border border-[#D4143D]/30 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium text-[#F3E7CF]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4143D]" />
            <span>Guest Trial</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-[#D4143D] bg-[#D4143D]/10 px-2 py-0.5 rounded-full border border-[#D4143D]/30">
            {guestMessageCount}/{maxGuestMessages} Chats
          </span>
        </div>
      )}

      <div className="p-3">
        <button
          onClick={() => {
            onNewChat();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-[#D4143D] text-[#F3E7CF] hover:bg-[#8F1028] font-semibold text-xs transition-all duration-200 shadow-[0_0_15px_rgba(212,20,61,0.2)] flex items-center justify-center gap-2 group border border-transparent hover:border-[#D4143D]"
        >
          <Plus className="w-4 h-4 text-[#F3E7CF] group-hover:rotate-90 transition-transform duration-200" />
          <span className="tracking-wide">New Chat</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="px-3 pb-2">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-[#A1A1AA]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-[#0D0D0D] border border-[#242424] text-xs text-[#F5F5F0] placeholder-[#A1A1AA] rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#D4143D] transition-colors"
          />
        </div>
      </div>

      {/* Conversation List Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 custom-scrollbar">
        <ChatHistory
          conversations={filteredConversations}
          activeId={activeId}
          onSelect={(id) => {
            onSelectConversation(id);
            if (onCloseMobile) onCloseMobile();
          }}
          onTogglePin={onTogglePin}
          onDelete={onDeleteConversation}
        />

        {/* Workspace section */}
        <div className="pt-3 border-t border-[#242424] space-y-1">
          <div className="px-3 text-[11px] font-mono font-medium text-[#A1A1AA] uppercase tracking-wider">
            Workspace
          </div>
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-[#C6283D] hover:text-[#C6283D] hover:bg-[#C6283D]/10 border border-[#C6283D]/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#C6283D]" />
              <span>Admin Console</span>
            </Link>
          )}
          <Link
            href="/chat"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-[#A1A1AA] hover:text-[#F3E7CF] hover:bg-[#0D0D0D] transition-colors"
          >
            <FolderKanban className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Projects & Files</span>
          </Link>
          <Link
            href="/settings/integrations"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-[#A1A1AA] hover:text-[#F3E7CF] hover:bg-[#0D0D0D] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4143D]" />
            <span className="flex-1">Google Calendar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </Link>
        </div>
      </div>

      {/* Footer / Settings & Clerk Profile Menu */}
      <div className="p-3 border-t border-[#242424] relative bg-[#080808]">
        {isSignedIn ? (
          <div className="flex items-center justify-between gap-2.5 p-2 rounded-xl bg-[#0D0D0D] border border-[#242424]">
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonBox: 'text-xs text-[#F5F5F0] font-medium',
                  userButtonAvatarBox: 'w-7 h-7 border border-[#27272A]',
                },
              }}
            />
              <Link
                href="/user-profile"
                className="text-[#A1A1AA] hover:text-[#F3E7CF] p-1.5 rounded-lg hover:bg-[#18181B] transition-colors"
                title="Clerk User Profile"
              >
                <User className="w-4 h-4" />
              </Link>
              <Link
                href="/settings"
                className="text-[#A1A1AA] hover:text-[#F3E7CF] p-1.5 rounded-lg hover:bg-[#18181B] transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </Link>
              <Link
                href="/settings"
                className="text-[#A1A1AA] hover:text-[#F3E7CF] p-1.5 rounded-lg hover:bg-[#18181B] transition-colors"
                title="Help & Support"
              >
                <HelpCircle className="w-4 h-4" />
              </Link>
            </div>
        ) : (
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="w-full py-2.5 px-3 rounded-xl bg-[#D4143D] text-[#F3E7CF] hover:bg-[#8F1028] font-semibold text-xs shadow-[0_0_15px_rgba(212,20,61,0.2)] transition-all">
                Sign In / Sign Up
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen sticky top-0 flex-shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Slide-Out */}
      {isOpenMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
