'use client';

import { redirect } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootRedirect() {
  redirect('/home');
}