type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div style={{ 
      color: 'red', 
      padding: '15px', 
      margin: '10px 0',
      backgroundColor: '#ffeeee',
      borderRadius: '4px',
      textAlign: 'center'
    }}>
      {message}
    </div>
  );
}