# Slash — Data Model (ERD)

The Slash backend runs on **Supabase (PostgreSQL)**. Authentication is handled by
Supabase's built-in `auth.users` table; the app owns two tables in the `public`
schema, both protected by Row Level Security so a user can only ever read or
write their own rows.

![Slash ERD](./erd.svg)

## Relationships

- `auth.users (1)` ──< `public.subscriptions (∞)` — each subscription belongs to one user.
- `auth.users (1)` ──< `public.cancellations (∞)` — each cancellation belongs to one user.
- `public.subscriptions (1)` ──< `public.cancellations (∞)` — a cancellation references the subscription that was cut.

## Mermaid source

```mermaid
erDiagram
    users ||--o{ subscriptions : owns
    users ||--o{ cancellations : owns
    subscriptions ||--o{ cancellations : "cut as"

    users {
        uuid id PK
        text email
        jsonb raw_user_meta_data
        timestamptz created_at
    }

    subscriptions {
        text id PK
        uuid user_id FK "→ auth.users.id"
        text slug
        text name
        text plan
        text category
        numeric amount
        text billing_cycle
        text status "active | duplicate | unused | cut"
        boolean flagged
        text tone
        text icon
        text initials
        date last_charge_date
        date start_date
        text last_usage
        text next_billing
        numeric total_paid
        numeric yearly_cost
        text warning_label
        text recommendation
        timestamptz created_at
    }

    cancellations {
        uuid id PK
        text subscription_id FK "→ subscriptions.id"
        uuid user_id FK "→ auth.users.id"
        numeric monthly_amount
        numeric yearly_saving
        text reason
        text letter_text
        timestamptz created_at
    }
```

## Row Level Security

Every policy is owner-scoped:

```sql
-- subscriptions & cancellations both use the same pattern
using (auth.uid() = user_id)        -- select / update / delete
with check (auth.uid() = user_id)   -- insert / update
```

Migrations live in [`/supabase/migrations`](../supabase/migrations):

| File | What it does |
| --- | --- |
| `0001_create_subscriptions.sql` | Initial `subscriptions` table |
| `0002_subscriptions_write_policy.sql` | (legacy) open write policy — superseded by 0003 |
| `0003_user_scoping_and_rls.sql` | Adds `user_id`, owner-only RLS |
| `0004_create_cancellations.sql` | `cancellations` ledger + owner-only RLS |
