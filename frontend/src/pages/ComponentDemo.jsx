import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Loader, Modal, Toast } from "../components/ui";

export default function ComponentDemo() {
  return (
    <div className="min-h-screen flex flex-col gap-4">
        <Navbar />
        
        <h1>Component Library Demo</h1>

        <Button text="Click Me" />
        <Input placeholder="Enter Name" />
        <Loader />
        <Toast message="Success!" />
        <Modal title="Demo Modal">
          <p>Test</p>
        </Modal>

        <Footer />
    </div>
  );
}