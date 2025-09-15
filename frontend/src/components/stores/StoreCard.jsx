export default function StoreCard({ store, onRate }) {
  return (
    <div className="border p-4 rounded shadow flex justify-between">
      <div>
        <h3 className="text-lg font-semibold">{store.name}</h3>
        <p className="text-sm text-gray-600">{store.address}</p>
        <p>⭐ {store.averageRating ?? "No ratings yet"}</p>
      </div>
      {onRate && (
        <select
          onChange={(e) => onRate(store.id, parseInt(e.target.value))}
          defaultValue=""
          className="border rounded p-1"
        >
          <option value="" disabled>
            Rate
          </option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
