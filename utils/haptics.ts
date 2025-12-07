export const triggerHaptic = (type: 'CLICK' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'START') => {
  // Check if vibration API is supported
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;

  try {
    switch (type) {
      case 'CLICK':
        // Subtle crisp feedback for UI interactions
        navigator.vibrate(10);
        break;
      case 'START':
        // slightly longer confirmation for actions like upload
        navigator.vibrate(25);
        break;
      case 'SUCCESS':
        // Safe Verdict: Pleasant double heartbeat
        navigator.vibrate([40, 60, 40]);
        break;
      case 'WARNING':
        // Caution: Staccato alert
        navigator.vibrate([80, 50, 80, 50, 80]);
        break;
      case 'DANGER':
        // Scam: Aggressive, long alarm pattern to signal danger
        navigator.vibrate([400, 100, 600, 100, 800]);
        break;
    }
  } catch (e) {
    // Fail silently on unsupported devices
  }
};