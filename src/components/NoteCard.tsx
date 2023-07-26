import { Badge, Card, Stack } from 'react-bootstrap';
import { SimplifiedNote } from '../App';
import { Link } from 'react-router-dom';
import styles from './NoteCard.module.css';

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
    return (
        <Card
            as={Link}
            to={`/${id}`}
            className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
            <Card.Body>
                <Stack
                    gap={2}
                    className='h-100 align-items-center justify-content-center'
                >
                    <span className='fs-5'>{title}</span>
                    {tags.length > 0 && (
                        <Stack
                            direction='horizontal'
                            gap={1}
                            className='flex-wrap justify-content-center'
                        >
                            {tags.map((t) => (
                                <Badge key={t.id} className='text-truncate'>
                                    {t.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    );
};
export default NoteCard;
