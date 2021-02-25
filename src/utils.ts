import { Mode } from 'stat-mode';

export function formatTimestamp(timestamp: number | BigInt) {
	const date = new Date(Number(timestamp));
	const
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hours = date.getHours(),
		minutes = date.getMinutes();

	const p = (v: any) => String(v).padStart(2, '0');
	return `${year}-${p(month)}-${p(day)} ${p(hours)}:${p(minutes)}`;
}

export function formatFileMode(mode: number) {
	return new Mode({ mode }).toString();
}
