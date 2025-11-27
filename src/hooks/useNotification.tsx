import NotificationBox, {
  NotificationBoxProps,
} from "../components/NotificationBox/NotificationBox";

export default function useNotification(props: NotificationBoxProps) {
  return <NotificationBox {...props} />;
}
