import Head from 'next/head';
import { getSession, useSession } from 'next-auth/react';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { connectToDatabase } from '../utils/connectDB';
import Widgets from '../components/Widgets';

export default function Home({ posts, articles }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const router = useRouter();
  // useSession()​ Client Side: Yes Server Side: No
  // The useSession() React Hook in the NextAuth.js to check if someone is signed in.
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push('/home');
    },
  });
  return (
    <div className="bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Let&apos;s build: Feed | LinkedIn</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center  gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />

          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        {/* By wrapping the new component in AnimatePresence, when it's removed it'll automatically
        animate back to the original component's position as an exit animation. */}
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// getSession()​ Client Side: Yes; Server Side: Yes: Yes
// When calling getSession() server side, you need to pass {req} or context object.
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    };
  }

  // Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection('posts')
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  // Get Google News API
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=ua&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());
  // Example response { "status": "ok", "totalResults": 56, -"articles": [...
  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
}
