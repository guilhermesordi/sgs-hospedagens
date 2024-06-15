import { Chip } from '@/components';
import { useCallback, useState } from 'react';

type StatusKeys = 'COMPLETE' | 'ONGOING' | 'PENDING';

type StatusChipProps = {
  status: StatusKeys;
};

export const StatusChip = ({ status: statusProp }: StatusChipProps) => {
  const [status, setStatus] = useState(statusProp);

  const captions: Record<StatusKeys, string> = {
    COMPLETE: 'Completo',
    ONGOING: 'Andamento',
    PENDING: 'Pendente',
  };

  const getVariant = useCallback(() => {
    switch (status) {
      case 'COMPLETE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'ONGOING':
        return 'info';
    }
  }, [status]);

  const handleUpdate = useCallback(() => {
    switch (status) {
      case 'PENDING':
        setStatus('ONGOING');
        break;
      case 'ONGOING':
        setStatus('COMPLETE');
        break;
    }
  }, [status]);

  const hasNextStatus = status !== 'COMPLETE';

  return (
    <button
      onClick={handleUpdate}
      className={`rounded-[30px] cursor-default ${hasNextStatus && 'cursor-pointer'}`}
      disabled={!hasNextStatus}
    >
      <Chip variant={getVariant()}>
        <span>{captions[status]}</span>
        {hasNextStatus && <span className="material-icons-round text-xl w-3">chevron_right</span>}
      </Chip>
    </button>
  );
};
