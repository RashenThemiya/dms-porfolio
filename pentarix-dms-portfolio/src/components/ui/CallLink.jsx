import { contactPhone } from '../../data/phone.js';

export default function CallLink({ children, ...props }) {
  return (
    <a {...props} href={contactPhone.href}>
      {children}
    </a>
  );
}
