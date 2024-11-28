import styles from '../styles/ContactPage.module.css';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Do you have questions, comments, or anything else for us? Leave us a message using the form below or contact us at admin@website.com or via WhatsApp at +91 112233445.
        </p>
        
        <form className={styles.form}>
          <div className={styles.row}>
            <input type="text" placeholder="Enter Your Name" className={styles.input} />
            <input type="email" placeholder="Enter Email Address" className={styles.input} />
          </div>
          <div className={styles.row}>
            <input type="text" placeholder="Enter WhatsApp Number" className={styles.input} />
            <select className={styles.input}>
              <option>--- Where you found us? ---</option>
              <option>Google</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Others</option>
            </select>
          </div>
          <input type="text" placeholder="Enter Email Subject" className={styles.input} />
          <textarea placeholder="Enter your query..." className={styles.textarea}></textarea>
          <button type="submit" className={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
}