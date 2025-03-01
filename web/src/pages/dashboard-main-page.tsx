import { atom, useAtom } from 'jotai';
import { Menu, Icon, Button, Popover, Label } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';

type Opts = Record<string, { value: string }>;

const options: Opts = {'aboba': { value: 'sex'}};

const filtersAtom = atom<Opts>({});

export function DashboardMainPage() {
  const [filters, setFilters] = useAtom(filtersAtom);

  return (
    <div className='px-4 pt-6 flex flex-col gap-4'>
      <section className='flex flex-row gap-4 align-middle'>
        {Object.entries(filters).map(([name, { value }]) => <Popover content={<div>input a la {name}</div>}>
            <Label size='m' value={value}>{name}</Label>
        </Popover>)}
        <Popover 
            content={
                <Menu>
                    {Object.entries(options).map(([name, { value }]) =>
                        <Menu.Item onClick={() => setFilters((filters) => ({...filters, [name]: { value }}))}>
                            {name}
                        </Menu.Item>
                    )}
                </Menu>
            }
        >
            <Button
                view="action"
            >
                <Icon data={Plus} />
            </Button>
        </Popover>
      </section>
      
    </div>
  )  
}