import { NoteData, Tag } from '../App';
import { NoteForm } from './NoteForm';

export interface NewNoteFormProps {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
}

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteFormProps) => {
    return (
        <>
            <div className='mb-4'>New Note</div>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    );
};

export default NewNote;
